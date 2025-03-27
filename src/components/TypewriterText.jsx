import React, { useEffect, useState, useRef } from 'react';

export default function TypewriterText({ text = '', speed = 50 }) {
  const [displayText, setDisplayText] = useState('');
  const indexRef = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    // Reset
    setDisplayText('');
    indexRef.current = 0;

    // Lance la machine
    intervalRef.current = setInterval(() => {
      setDisplayText(prev => prev + text.charAt(indexRef.current));
      indexRef.current += 1;

      // Jouer un petit son de "tape" ici si tu veux
      // new Audio('/some/key-press.mp3').play().catch(() => {});

      if (indexRef.current >= text.length) {
        clearInterval(intervalRef.current);
      }
    }, speed);

    return () => clearInterval(intervalRef.current);
  }, [text, speed]);

  return (
    <div className="typewriter-text">
      {displayText}
    </div>
  );
}
