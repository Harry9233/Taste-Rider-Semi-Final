import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const ShippingPage = () => {
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
      id: 'shipping-info',
      title: 'SHIPPING INFORMATION',
      content: [
        'At H.B.Metals, we are committed to providing you with the best possible shipping experience. We understand that receiving your order promptly and in perfect condition is important to you, and we strive to meet those expectations with every order.'
      ]
    },
    {
      id: 'processing-time',
      title: 'PROCESSING TIME',
      content: [
        'All orders are processed within 1-2 business days (excluding weekends and holidays) after receiving your order confirmation email. You will receive another notification when your order has shipped.',
        'If we are experiencing a high volume of orders, shipments may be delayed by a few days. Please allow additional days in transit for delivery. If there will be a significant delay in the shipment of your order, we will contact you via email or telephone.'
      ]
    },
    {
      id: 'shipping-rates',
      title: 'SHIPPING RATES & DELIVERY ESTIMATES',
      content: [
        'Shipping charges for your order will be calculated and displayed at checkout. We currently offer flat rate shipping of ₹99 for all orders within India.',
        'Delivery times are estimates and commence from the date of shipping, rather than the date of order. Delivery times are to be used as a guide only and are subject to the acceptance and approval of your order.',
        'Estimated delivery times:',
        'Metro Cities (Delhi, Mumbai, Kolkata, Chennai, Bangalore, Hyderabad): 2-4 business days',
        'Tier 2 Cities: 3-5 business days',
        'Rest of India: 5-7 business days',
        'Please note that delivery times may vary depending on the shipping address and during peak periods such as major holidays.'
      ]
    },
    {
      id: 'tracking',
      title: 'SHIPMENT CONFIRMATION & ORDER TRACKING',
      content: [
        'You will receive a Shipment Confirmation email once your order has shipped containing your tracking number(s). The tracking number will be active within 24 hours.',
        'You can track your order by clicking the tracking link in your shipping confirmation email, or by logging into your account on our website and viewing the order details.'
      ]
    },
    {
      id: 'carriers',
      title: 'SHIPPING CARRIERS',
      content: [
        'We use the following carriers to deliver our orders:',
        'Delhivery',
        'BlueDart',
        'DTDC',
        'India Post',
        'If you have any questions about your shipment or need to change your shipping address after placing an order, please contact us as soon as possible at info@tasterider.in.'
      ]
    },
    {
      id: 'international',
      title: 'INTERNATIONAL SHIPPING',
      content: [
        'Currently, we only ship within India. We hope to offer international shipping in the future.'
      ]
    },
    {
      id: 'restrictions',
      title: 'SHIPPING RESTRICTIONS',
      content: [
        'There are some restrictions on what can be shipped. These restrictions are usually based on the shipping carrier\'s policies and local laws and regulations.',
        'Restricted items include:',
        'Hazardous materials',
        'Flammable liquids or gases',
        'Illegal substances'
      ]
    },
    {
      id: 'damaged-items',
      title: 'DAMAGED ITEMS IN TRANSPORT',
      content: [
        'If your package arrives damaged, please save all packaging materials and contact us immediately at info@tasterider.in. We will work with you to resolve the issue promptly.'
      ]
    },
    {
      id: 'missing-packages',
      title: 'MISSING/LOST PACKAGES',
      content: [
        'If your tracking information states that your package was delivered, but you have not received it, please check the following:',
        'Check with neighbors and household members',
        'Check any other locations where packages may be left at your address',
        'Wait 24 hours as sometimes packages are marked as delivered before they actually arrive',
        'If you still cannot locate your package, please contact us at info@tasterider.in within 7 days of the expected delivery date. We will work with the shipping carrier to locate your package or process a replacement or refund.'
      ]
    },
    {
      id: 'address-changes',
      title: 'SHIPPING ADDRESS CHANGES',
      content: [
        'If you need to change your shipping address after placing your order, please contact us immediately at info@tasterider.in. We will do our best to accommodate your request, but once an order has been processed or shipped, we may not be able to change the shipping address.'
      ]
    },
    {
      id: 'customs',
      title: 'CUSTOMS, DUTIES, AND TAXES',
      content: [
        'As we currently only ship within India, customs, duties, and taxes are not applicable. All applicable taxes for domestic shipping are included in the final price at checkout.'
      ]
    },
    {
      id: 'contact',
      title: 'CONTACT US',
      content: [
        'If you have any questions about our Shipping Policy, please contact us at info@tasterider.in or by mail at H.B.Metals, Jaipur, Rajasthan, India.'
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

        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-stone-800 border-b pb-4 border-amber-200">Shipping Policy</h1>
        
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

export default ShippingPage;