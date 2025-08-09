import React, { useEffect, useRef } from 'react';

const FooterWaveBorder = () => {
  const svgRef = useRef(null);
  
  // Add subtle animation effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!svgRef.current) return;
      
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      const documentHeight = document.body.clientHeight;
      
      // Calculate scroll percentage
      const scrollPercentage = scrollPosition / (documentHeight - viewportHeight);
      
      // Apply subtle transform based on scroll position
      // This creates a gentle parallax-like effect
      if (scrollPercentage > 0.7) {
        const translateY = Math.min((scrollPercentage - 0.7) * 20, 5);
        svgRef.current.style.transform = `translateY(${translateY}px)`;
      } else {
        svgRef.current.style.transform = 'translateY(0)';
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="footer-wave-container w-full overflow-hidden relative -mb-1">
      {/* SVG wave pattern with organic, flowing top border */}
      <svg
        ref={svgRef}
        className="w-full h-auto transition-transform duration-300 ease-out block"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Gradient definitions */}
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" /> {/* Start transparent to blend with page */}
            <stop offset="20%" stopColor="#FFF8DC" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#8B7355" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#3B3429" stopOpacity="1" />
          </linearGradient>
          
          {/* Texture pattern */}
          <pattern id="grainPattern" width="100" height="100" patternUnits="userSpaceOnUse" patternTransform="scale(0.08)">
            <rect width="100%" height="100%" fill="#3B3429" />
            <rect width="1" height="1" fill="#D2B48C" opacity="0.15" x="0" y="0" />
            <rect width="1" height="1" fill="#D2B48C" opacity="0.15" x="25" y="30" />
            <rect width="1" height="1" fill="#D2B48C" opacity="0.15" x="50" y="70" />
            <rect width="1" height="1" fill="#D2B48C" opacity="0.15" x="75" y="23" />
            <rect width="1" height="1" fill="#D2B48C" opacity="0.15" x="38" y="46" />
            <rect width="1" height="1" fill="#D2B48C" opacity="0.15" x="91" y="18" />
            <rect width="1" height="1" fill="#D2B48C" opacity="0.15" x="13" y="85" />
            <rect width="1" height="1" fill="#D2B48C" opacity="0.15" x="63" y="56" />
          </pattern>
        </defs>
        
        {/* Main wave path with organic, terrain-like shape */}
        <path
          d="M0,96 
             C150,80 200,20 300,30 
             C400,40 450,90 550,70 
             C650,50 700,10 800,20 
             C900,30 950,80 1050,65 
             C1150,50 1170,30 1200,40 
             L1200,120 L0,120 Z"
          fill="url(#waveGradient)"
          className="transition-all duration-700 ease-in-out"
          style={{ filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.1))', borderRadius: '0' }}
        />
        
        {/* Texture overlay */}
        <path
          d="M0,96 
             C150,80 200,20 300,30 
             C400,40 450,90 550,70 
             C650,50 700,10 800,20 
             C900,30 950,80 1050,65 
             C1150,50 1170,30 1200,40 
             L1200,120 L0,120 Z"
          fill="url(#grainPattern)"
          opacity="0.3"
        />
        
        {/* Additional subtle wave details */}
        <path
          d="M0,100 
             C100,95 150,85 250,90 
             C350,95 400,105 500,100 
             C600,95 650,85 750,90 
             C850,95 900,105 1000,100 
             C1100,95 1150,90 1200,95 
             L1200,120 L0,120 Z"
          fill="#3B3429"
          opacity="0.4"
        />
      </svg>
    </div>
  );
};

export default FooterWaveBorder;