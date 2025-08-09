import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPage = () => {
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
      id: 'overview',
      title: 'OVERVIEW',
      content: [
        'This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from H.B.Metals.'
      ]
    },
    {
      id: 'personal-info-collect',
      title: 'PERSONAL INFORMATION WE COLLECT',
      content: [
        'When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site. We refer to this automatically-collected information as "Device Information."',
        'We collect Device Information using the following technologies:',
        '"Cookies" are data files that are placed on your device or computer and often include an anonymous unique identifier. For more information about cookies, and how to disable cookies, visit http://www.allaboutcookies.org.',
        '"Log files" track actions occurring on the Site, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.',
        '"Web beacons," "tags," and "pixels" are electronic files used to record information about how you browse the Site.',
        'Additionally when you make a purchase or attempt to make a purchase through the Site, we collect certain information from you, including your name, billing address, shipping address, payment information (including credit card numbers), email address, and phone number. We refer to this information as "Order Information."',
        'When we talk about "Personal Information" in this Privacy Policy, we are talking both about Device Information and Order Information.'
      ]
    },
    {
      id: 'how-we-use',
      title: 'HOW DO WE USE YOUR PERSONAL INFORMATION?',
      content: [
        'We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations). Additionally, we use this Order Information to:',
        'Communicate with you;',
        'Screen our orders for potential risk or fraud; and',
        'When in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.',
        'We use the Device Information that we collect to help us screen for potential risk and fraud (in particular, your IP address), and more generally to improve and optimize our Site (for example, by generating analytics about how our customers browse and interact with the Site, and to assess the success of our marketing and advertising campaigns).'
      ]
    },
    {
      id: 'sharing',
      title: 'SHARING YOUR PERSONAL INFORMATION',
      content: [
        'We share your Personal Information with third parties to help us use your Personal Information, as described above. For example, we use Shopify to power our online store--you can read more about how Shopify uses your Personal Information here: https://www.shopify.com/legal/privacy. We also use Google Analytics to help us understand how our customers use the Site -- you can read more about how Google uses your Personal Information here: https://www.google.com/intl/en/policies/privacy/. You can also opt-out of Google Analytics here: https://tools.google.com/dlpage/gaoptout.',
        'Finally, we may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.'
      ]
    },
    {
      id: 'behavioral',
      title: 'BEHAVIOURAL ADVERTISING',
      content: [
        'As described above, we use your Personal Information to provide you with targeted advertisements or marketing communications we believe may be of interest to you. For more information about how targeted advertising works, you can visit the Network Advertising Initiative\'s ("NAI") educational page at http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work.',
        'You can opt out of targeted advertising by using the links below:',
        'Facebook: https://www.facebook.com/settings/?tab=ads',
        'Google: https://www.google.com/settings/ads/anonymous',
        'Bing: https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads',
        'Additionally, you can opt out of some of these services by visiting the Digital Advertising Alliance\'s opt-out portal at: http://optout.aboutads.info/.'
      ]
    },
    {
      id: 'do-not-track',
      title: 'DO NOT TRACK',
      content: [
        'Please note that we do not alter our Site\'s data collection and use practices when we see a Do Not Track signal from your browser.'
      ]
    },
    {
      id: 'your-rights',
      title: 'YOUR RIGHTS',
      content: [
        'If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the contact information below.',
        'Additionally, if you are a European resident we note that we are processing your information in order to fulfill contracts we might have with you (for example if you make an order through the Site), or otherwise to pursue our legitimate business interests listed above. Additionally, please note that your information will be transferred outside of Europe, including to Canada and the United States.'
      ]
    },
    {
      id: 'data-retention',
      title: 'DATA RETENTION',
      content: [
        'When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to delete this information.'
      ]
    },
    {
      id: 'minors',
      title: 'MINORS',
      content: [
        'The Site is not intended for individuals under the age of 18.'
      ]
    },
    {
      id: 'changes',
      title: 'CHANGES',
      content: [
        'We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.'
      ]
    },
    {
      id: 'contact',
      title: 'CONTACT US',
      content: [
        'For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at info@tasterider.in or by mail using the details provided below:',
        'H.B.Metals, Jaipur, Rajasthan, India'
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

        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-stone-800 border-b pb-4 border-amber-200">Privacy Policy</h1>
        
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

export default PrivacyPage;