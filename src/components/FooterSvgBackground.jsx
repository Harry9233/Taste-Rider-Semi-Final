import React from 'react';

const FooterSvgBackground = () => {
  return (
    <div className="relative w-full overflow-hidden">
      <svg 
        className="w-full h-auto" 
        viewBox="0 0 800 400" 
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        aria-hidden="true"
      > 
        <defs> 
          {/* Gradient for main page content - using website's color scheme */ }
          <linearGradient id="pageGradient" x1="0%" y1="0%" x2="0%" y2="100%"> 
            <stop offset="0%" style={{stopColor:"#FFF8DC", stopOpacity:1}} /> 
            <stop offset="100%" style={{stopColor:"#E9ECEF", stopOpacity:1}} /> 
          </linearGradient> 
            
          {/* Gradient for footer - using website's amber/brown theme */ }
          <linearGradient id="footerGradient" x1="0%" y1="0%" x2="0%" y2="100%"> 
            <stop offset="0%" style={{stopColor:"#d4c5b0", stopOpacity:1}} /> 
            <stop offset="50%" style={{stopColor:"#b8a082", stopOpacity:1}} /> 
            <stop offset="100%" style={{stopColor:"#9d8567", stopOpacity:1}} /> 
          </linearGradient> 
            
          {/* Texture pattern */ }
          <pattern id="texture" patternUnits="userSpaceOnUse" width="4" height="4"> 
            <circle cx="1" cy="1" r="0.3" fill="#000" opacity="0.05"/> 
            <circle cx="3" cy="3" r="0.2" fill="#000" opacity="0.03"/> 
          </pattern> 
        </defs> 
          
        {/* Main page content area */ }
        <rect x="0" y="0" width="800" height="200" fill="url(#pageGradient)"/> 
          
        {/* Organic transition curve */ }
        <path d="M0,180 Q100,160 200,170 T400,165 Q500,160 600,175 T800,170 L800,400 L0,400 Z"  
              fill="url(#footerGradient)" opacity="0.9"/> 
          
        {/* Additional organic layers for depth */ }
        <path d="M0,190 Q120,175 250,180 T500,175 Q650,170 800,185 L800,400 L0,400 Z"  
              fill="url(#footerGradient)" opacity="0.7"/> 
          
        {/* Subtle texture overlay */ }
        <rect x="0" y="170" width="800" height="230" fill="url(#texture)"/> 
      </svg>
    </div>
  );
};

export default FooterSvgBackground;