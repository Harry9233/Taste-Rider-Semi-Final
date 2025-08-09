import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const RefundPage = () => {
  const [expandedSections, setExpandedSections] = useState({});
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      
      // If switching to desktop, expand all sections
      if (window.innerWidth >= 768) {
        const allSections = {};
        sections.forEach(section => {
          allSections[section.id] = true;
        });
        setExpandedSections(allSections);
      }
    };

    // Set all sections expanded by default on desktop
    if (!isMobile) {
      const allSections = {};
      sections.forEach(section => {
        allSections[section.id] = true;
      });
      setExpandedSections(allSections);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSection = (sectionId) => {
    if (isMobile) {
      setExpandedSections(prev => ({
        ...prev,
        [sectionId]: !prev[sectionId]
      }));
    }
  };

  const sections = [
    {
      id: 'returns',
      title: 'RETURNS',
      content: [
        'Our policy lasts 7 days. If 7 days have gone by since your purchase, unfortunately we can\'t offer you a refund or exchange.',
        'To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.',
        'Several types of goods are exempt from being returned. Perishable goods such as food, flowers, newspapers or magazines cannot be returned. We also do not accept products that are intimate or sanitary goods, hazardous materials, or flammable liquids or gases.',
        'Additional non-returnable items:',
        'Gift cards',
        'Downloadable software products',
        'Some health and personal care items',
        'To complete your return, we require a receipt or proof of purchase.',
        'Please do not send your purchase back to the manufacturer.',
        'There are certain situations where only partial refunds are granted (if applicable):',
        'Book with obvious signs of use',
        'CD, DVD, VHS tape, software, video game, cassette tape, or vinyl record that has been opened',
        'Any item not in its original condition, is damaged or missing parts for reasons not due to our error',
        'Any item that is returned more than 7 days after delivery'
      ]
    },
    {
      id: 'refunds',
      title: 'REFUNDS (IF APPLICABLE)',
      content: [
        'Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.',
        'If you are approved, then your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within a certain amount of days.'
      ]
    },
    {
      id: 'late-refunds',
      title: 'LATE OR MISSING REFUNDS (IF APPLICABLE)',
      content: [
        'If you haven\'t received a refund yet, first check your bank account again.',
        'Then contact your credit card company, it may take some time before your refund is officially posted.',
        'Next contact your bank. There is often some processing time before a refund is posted.',
        'If you\'ve done all of this and you still have not received your refund yet, please contact us at info@tasterider.in.'
      ]
    },
    {
      id: 'sale-items',
      title: 'SALE ITEMS (IF APPLICABLE)',
      content: [
        'Only regular priced items may be refunded, unfortunately sale items cannot be refunded.'
      ]
    },
    {
      id: 'exchanges',
      title: 'EXCHANGES (IF APPLICABLE)',
      content: [
        'We only replace items if they are defective or damaged. If you need to exchange it for the same item, send us an email at info@tasterider.in and send your item to: H.B.Metals, Jaipur, Rajasthan, India.'
      ]
    },
    {
      id: 'gifts',
      title: 'GIFTS',
      content: [
        'If the item was marked as a gift when purchased and shipped directly to you, you\'ll receive a gift credit for the value of your return. Once the returned item is received, a gift certificate will be mailed to you.',
        'If the item wasn\'t marked as a gift when purchased, or the gift giver had the order shipped to themselves to give to you later, we will send a refund to the gift giver and he will find out about your return.'
      ]
    },
    {
      id: 'shipping',
      title: 'SHIPPING',
      content: [
        'To return your product, you should mail your product to: H.B.Metals, Jaipur, Rajasthan, India.',
        'You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.',
        'Depending on where you live, the time it may take for your exchanged product to reach you, may vary.',
        'If you are shipping an item over ₹5000, you should consider using a trackable shipping service or purchasing shipping insurance. We don\'t guarantee that we will receive your returned item.'
      ]
    },
    {
      id: 'cancellation',
      title: 'CANCELLATION',
      content: [
        'An order can be cancelled before it is shipped. Once the order is shipped, the standard return policy will apply.',
        'To cancel an order, please contact us immediately at info@tasterider.in with your order number and a request for cancellation.'
      ]
    },
    {
      id: 'contact',
      title: 'CONTACT US',
      content: [
        'If you have any questions about our Returns and Refund Policy, please contact us at info@tasterider.in or by mail at H.B.Metals, Jaipur, Rajasthan, India.'
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-4xl overflow-x-hidden w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-amber-600 hover:text-amber-700 transition-colors">
            <ArrowLeft size={16} className="mr-2" />
            Back to Home
          </Link>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-stone-800 border-b pb-4 border-amber-200">Refund Policy</h1>
        
        <div className="prose prose-stone prose-sm md:prose-base lg:prose-lg max-w-none break-words w-full" style={{ color: '#44403c' }}>
          {/* This uses Tailwind's responsive typography instead of global zoom */}
          <style dangerouslySetInnerHTML={{ __html: `
            h2 { color: #92400e !important; }
            p { color: #44403c !important; }
            strong { color: #1c1917 !important; }
            .section-header { cursor: pointer; }
            .section-header:hover { opacity: 0.9; }
          `}} />
          
          {sections.map((section) => (
            <div key={section.id} className="mb-6">
              <div 
                className={`section-header flex justify-between items-center ${isMobile ? 'bg-amber-50 p-3 rounded-lg' : ''}`}
                onClick={() => toggleSection(section.id)}
              >
                <h2 className="text-lg sm:text-xl font-semibold mt-0 mb-0">{section.title}</h2>
                {isMobile && (
                  <div className="text-amber-600">
                    {expandedSections[section.id] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                )}
              </div>
              
              {(!isMobile || expandedSections[section.id]) && (
                <div className={`mt-3 ${isMobile ? 'pl-3' : ''}`}>
                  {section.content.map((paragraph, idx) => (
                    <p key={idx} className="mb-3">{paragraph}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default RefundPage;