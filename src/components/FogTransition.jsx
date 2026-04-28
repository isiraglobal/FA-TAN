import React from 'react';

export default function FogTransition({ scrollPercent }) {
  let opacity = 0;
  
  if (scrollPercent > 15 && scrollPercent < 35) {
    // Fade in from 15 to 20
    if (scrollPercent <= 20) {
      opacity = (scrollPercent - 15) / 5;
    } 
    // Hold from 20 to 30
    else if (scrollPercent <= 30) {
      opacity = 1;
    }
    // Fade out from 30 to 35
    else {
      opacity = 1 - (scrollPercent - 30) / 5;
    }
  } else if (scrollPercent > 45 && scrollPercent < 60) {
    // Second fog transition
    if (scrollPercent <= 50) {
      opacity = (scrollPercent - 45) / 5;
    } else if (scrollPercent <= 55) {
      opacity = 1;
    } else {
      opacity = 1 - (scrollPercent - 55) / 5;
    }
  }

  // Cap opacity at 0.6
  opacity *= 0.6;

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-30 transition-opacity duration-300"
      style={{ 
        opacity,
        background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 70%)'
      }}
    />
  );
}
