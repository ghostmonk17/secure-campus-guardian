
import React, { useEffect, useState } from 'react';

const InteractiveCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      className="pointer-events-none fixed z-50 h-5 w-5 rounded-full bg-primary/40 backdrop-blur-sm transition-transform duration-300 mix-blend-difference"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)'
      }}
    />
  );
};

export default InteractiveCursor;
