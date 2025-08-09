import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/components/ui/use-toast";
import apiClient from '@/lib/apiClient';
import { MessageSquare, Plus, Send, Clock, CheckCircle, AlertCircle, X, ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const SupportTicketComponent = ({ session }) => {
  const { toast } = useToast();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [expandedTicket, setExpandedTicket] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [newTicket, setNewTicket] = useState({
    subject: '',
    message: '',
    order_id: ''
  });

  // Mock ticket data - in a real app, this would come from Supabase
  const mockTickets = [
    {
      id: 'TKT-001',
      subject: 'Order Delivery Delay',
      status: 'Open',
      created_at: '2023-11-15T10:30:00',
      updated_at: '2023-11-15T14:45:00',
      messages: [
        {
          id: 1,
          sender: 'user',
          message: 'My order #ORD-001 was supposed to be delivered yesterday but I haven\'t received it yet. Can you please check the status?',
          timestamp: '2023-11-15T10:30:00'
        },
        {
          id: 2,
          sender: 'support',
          message: 'Thank you for reaching out. I apologize for the delay. I\'ve checked your order and there seems to be a slight delay with the courier. Your package is expected to be delivered by tomorrow. We\'ll keep you updated.',
          timestamp: '2023-11-15T14:45:00'
        }
      ]
    },
    {
      id: 'TKT-002',
      subject: 'Product Quality Issue',
      status: 'Closed',
      created_at: '2023-10-28T09:15:00',
      updated_at: '2023-10-30T11:20:00',
      messages: [
        {
          id: 1,
          sender: 'user',
          message: 'I received my Garam Masala but the packaging was damaged and some of the product had spilled.',
          timestamp: '2023-10-28T09:15:00'
        },
        {
          id: 2,
          sender: 'support',
          message: 'I\'m sorry to hear about the damaged packaging. We take product quality very seriously. Could you please send a photo of the damaged package?',
          timestamp: '2023-10-28T15:30:00'
        },
        {
          id: 3,
          sender: 'user',
          message: 'I\'ve sent the photos to your email address.',
          timestamp: '2023-10-29T10:45:00'
        },
        {
          id: 4,
          sender: 'support',
          message: 'Thank you for the photos. We\'ve processed a replacement order for you which will be shipped today. You should receive it within 3-5 business days. We\'ve also added a complimentary sample of our new Chat Masala as a token of apology for the inconvenience.',
          timestamp: '2023-10-29T14:20:00'
        },
        {
          id: 5,
          sender: 'user',
          message: 'Thank you for the quick resolution! Looking forward to trying the Chat Masala.',
          timestamp: '2023-10-30T09:10:00'
        },
        {
          id: 6,
          sender: 'support',
          message: 'You\'re welcome! We\'re glad we could resolve this to your satisfaction. Please let us know if you need anything else. Enjoy the Chat Masala!',
          timestamp: '2023-10-30T11:20:00'
        }
      ]
    }
  ];

  useEffect(() => {
    // In a real app, fetch tickets from Supabase
    // For now, we'll use mock data
    const fetchTickets = async () => {
      try {
        setLoading(true);
        // Simulate API call delay
        setTimeout(() => {
          setTickets(mockTickets);
          setLoading(false);
        }, 1000);

        // In a real implementation, you would fetch from Supabase:
        // const { data, error } = await supabase
        //   .from('support_tickets')
        //   .select('*')
        //   .eq('user_id', session.user.id)
        //   .order('created_at', { ascending: false });
        //
        // if (error) throw error;
        // setTickets(data || []);
      } catch (error) {
        console.error('Error fetching tickets:', error);
        toast({
          title: 'Error',
          description: 'Failed to load support tickets',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchTickets();
    }
  }, [session, toast]);

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await apiClient.post('/contact', {
        name: user.email,
        email: user.email,
        message: `Subject: ${newTicket.subject}\n\n${newTicket.message}`,
      });

      if (response.status === 200) {
        toast({
          title: 'Ticket Created',
          description: 'Your support ticket has been successfully created',
          className: 'toast-success-theme',
        });
        setNewTicket({ subject: '', message: '', order_id: '' });
        setCreating(false);
      }
    } catch (error) {
      console.error('Error creating ticket:', error);
      toast({
        title: 'Error',
        description: 'Failed to create support ticket',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleSendMessage = async (ticketId) => {
    if (!newMessage.trim()) return;

    try {
      setSubmitting(true);

      // In a real app, add message to Supabase
      // For now, update local state
      setTimeout(() => {
        const updatedTickets = tickets.map(ticket => {
          if (ticket.id === ticketId) {
            const updatedMessages = [
              ...ticket.messages,
              {
                id: ticket.messages.length + 1,
                sender: 'user',
                message: newMessage,
                timestamp: new Date().toISOString()
              }
            ];

            return {
              ...ticket,
              messages: updatedMessages,
              updated_at: new Date().toISOString()
            };
          }
          return ticket;
        });

        setTickets(updatedTickets);
        setNewMessage('');
        setSubmitting(false);

        // Simulate support response after 3 seconds
        setTimeout(() => {
          const updatedTicketsWithResponse = tickets.map(ticket => {
            if (ticket.id === ticketId) {
              const updatedMessages = [
                ...ticket.messages,
                {
                  id: ticket.messages.length + 1,
                  sender: 'user',
                  message: newMessage,
                  timestamp: new Date().toISOString()
                },
                {
                  id: ticket.messages.length + 2,
                  sender: 'support',
                  message: 'Thank you for your message. Our support team will get back to you shortly.',
                  timestamp: new Date(Date.now() + 5000).toISOString()
                }
              ];

              return {
                ...ticket,
                messages: updatedMessages,
                updated_at: new Date(Date.now() + 5000).toISOString()
              };
            }
            return ticket;
          });

          setTickets(updatedTicketsWithResponse);
        }, 3000);
      }, 1000);

      // In a real implementation:
      // const { error } = await supabase
      //   .from('ticket_messages')
      //   .insert([{
      //     ticket_id: ticketId,
      //     user_id: session.user.id,
      //     message: newMessage,
      //     is_from_support: false
      //   }]);
      //
      // if (error) throw error;
      //
      // // Update ticket updated_at timestamp
      // await supabase
      //   .from('support_tickets')
      //   .update({ updated_at: new Date() })
      //   .eq('id', ticketId);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-stone-100 text-stone-800';
      case 'pending':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const toggleTicket = (ticketId) => {
    setExpandedTicket(expandedTicket === ticketId ? null : ticketId);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-amber-800 flex items-center">
          <MessageSquare className="mr-2 h-6 w-6" /> Support Tickets
        </h2>
        {!creating && (
          <Button 
            onClick={() => setCreating(true)} 
            className="bg-amber-600 hover:bg-amber-700 text-white"
          >
            <Plus className="mr-2 h-4 w-4" /> New Ticket
          </Button>
        )}
      </div>

      {creating && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-amber-200 bg-amber-50/50">
            <CardHeader>
              <CardTitle className="text-xl text-amber-800">Create New Support Ticket</CardTitle>
              <CardDescription>Please provide details about your issue or question</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateTicket} className="space-y-4">
                <div>
                  <Label htmlFor="subject" className="text-stone-700">Subject *</Label>
                  <Input
                    id="subject"
                    value={newTicket.subject}
                    onChange={(e) => setNewTicket({...newTicket, subject: e.target.value})}
                    className="mt-1 bg-white border-amber-200 focus:border-amber-600"
                    placeholder="Brief description of your issue"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="order_id" className="text-stone-700">Order ID (if applicable)</Label>
                  <Input
                    id="order_id"
                    value={newTicket.order_id}
                    onChange={(e) => setNewTicket({...newTicket, order_id: e.target.value})}
                    className="mt-1 bg-white border-amber-200 focus:border-amber-600"
                    placeholder="e.g. ORD-001"
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="text-stone-700">Message *</Label>
                  <Textarea
                    id="message"
                    value={newTicket.message}
                    onChange={(e) => setNewTicket({...newTicket, message: e.target.value})}
                    className="mt-1 bg-white border-amber-200 focus:border-amber-600"
                    placeholder="Please describe your issue in detail"
                    rows={5}
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2 pt-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setCreating(false);
                      setNewTicket({
                        subject: '',
                        message: '',
                        order_id: ''
                      });
                    }}
                    disabled={submitting}
                    className="border-amber-200"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={submitting}
                    className="bg-amber-600 hover:bg-amber-700 text-white"
                  >
                    {submitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                        ></motion.div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" /> Submit Ticket
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {loading ? (
        <div className="text-center py-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full mx-auto mb-4"
          ></motion.div>
          <p className="text-stone-600">Loading your support tickets...</p>
        </div>
      ) : tickets.length === 0 ? (
        <div className="text-center py-12 bg-amber-50 rounded-lg border border-amber-200">
          <MessageSquare className="h-12 w-12 text-amber-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-amber-800 mb-2">No Support Tickets</h3>
          <p className="text-stone-600 mb-6">You haven't created any support tickets yet</p>
          {!creating && (
            <Button 
              onClick={() => setCreating(true)} 
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              <Plus className="mr-2 h-4 w-4" /> Create Your First Ticket
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <Card key={ticket.id} className={`border-l-4 ${ticket.status.toLowerCase() === 'open' ? 'border-l-green-500' : 'border-l-stone-400'}`}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg text-amber-800 flex items-center">
                      {ticket.subject}
                      <Badge className={`ml-3 ${getStatusColor(ticket.status)}`}>
                        {ticket.status}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="mt-1 flex items-center">
                      <span className="text-xs text-stone-500 flex items-center">
                        <Clock className="h-3 w-3 mr-1" /> Created: {formatDate(ticket.created_at)}
                      </span>
                      <span className="mx-2 text-stone-300">|</span>
                      <span className="text-xs text-stone-500 flex items-center">
                        <RefreshCw className="h-3 w-3 mr-1" /> Updated: {formatDate(ticket.updated_at)}
                      </span>
                    </CardDescription>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 text-stone-500"
                    onClick={() => toggleTicket(ticket.id)}
                  >
                    {expandedTicket === ticket.id ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </CardHeader>
              
              {expandedTicket === ticket.id && (
                <>
                  <Separator className="mx-6 bg-amber-100" />
                  <CardContent className="pt-4">
                    <div className="space-y-4 mb-4">
                      {ticket.messages.map((msg) => (
                        <div 
                          key={msg.id} 
                          className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-[80%] rounded-lg p-3 ${msg.sender === 'user' 
                              ? 'bg-amber-100 text-stone-800' 
                              : 'bg-white border border-amber-200 text-stone-800'}`}
                          >
                            <div className="text-sm">{msg.message}</div>
                            <div className="text-xs text-stone-500 mt-1 flex justify-end items-center">
                              {formatDate(msg.timestamp)}
                              {msg.sender === 'support' && (
                                <CheckCircle className="h-3 w-3 ml-1 text-green-600" />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {ticket.status.toLowerCase() === 'open' && (
                      <div className="mt-4">
                        <div className="flex space-x-2">
                          <Input
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type your reply here..."
                            className="flex-grow bg-white border-amber-200 focus:border-amber-600"
                            disabled={submitting}
                          />
                          <Button 
                            onClick={() => handleSendMessage(ticket.id)}
                            disabled={!newMessage.trim() || submitting}
                            className="bg-amber-600 hover:bg-amber-700 text-white"
                          >
                            {submitting ? (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                              ></motion.div>
                            ) : (
                              <Send className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SupportTicketComponent;
