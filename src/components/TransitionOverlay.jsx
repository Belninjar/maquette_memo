import React, { useEffect, useRef } from 'react';
import '../styles/Transition.css';

export default function TransitionOverlay({ logoDuration = 2000 }) {
  const overlayRef = useRef();

  useEffect(() => {
    // On peut gérer des classes CSS pour le fade in/out
    // ex: overlayRef.current.classList.add('fade-in');
    // setTimeout(() => { overlayRef.current.classList.add('fade-out'); }, 1000);
  }, []);

  return (
    <div className="transition-overlay" ref={overlayRef}>
      <div className="overlay-background"></div>
      <img className="overlay-logo" src="/path/to/logo.png" alt="logo" />
    </div>
  );
}
