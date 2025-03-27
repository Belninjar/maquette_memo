import React, { useState } from 'react';
import TypewriterText from './TypewriterText';

export default function StoryPlayer({ storyId, textData, onExit }) {
  // Récupérer la liste d’images => on cherche image1, image2, ... 
  // Pour simplifier, on va supposer qu’on va jusqu’à image12.jpg 
  // et qu’on arrête si l’image n’existe pas.
  const images = [];
  for (let i = 1; i <= 12; i++) {
    try {
      const path = new URL(`../assets/${storyId}/image${i}.jpg`, import.meta.url).href;
      images.push(path);
    } catch (e) {
      // si le fichier n’existe pas => on arrête
      break;
    }
  }

  const [currentIndex, setCurrentIndex] = useState(0);

  function handleSwipeLeft() {
    // On va à l’image suivante
    if (currentIndex < images.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // On est sur la dernière image => on quitte l’histoire
      onExit();
    }
  }

  function handleSwipeRight() {
    // On va à l’image précédente
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      // ou on peut boucler, ou ne rien faire
    }
  }

  // Pour simplifier, on va “simuler” le swipe avec des boutons << et >>,
  // mais tu peux gérer les events touchStart/touchEnd pour un vrai swipe.
  const currentImage = images[currentIndex];
  const currentTextKey = `image${currentIndex + 1}_text`;
  const currentText = textData[currentTextKey] || '';

  return (
    <div className="story-player">
      {/* Barre du haut : Bouton home */}
      <div className="player-top-bar">
        <button onClick={onExit}>Home</button>
      </div>

      {/* Image bord arrondi */}
      <div className="image-wrapper">
        <img src={currentImage} alt={`scene ${currentIndex + 1}`} className="rounded-corners" />
      </div>

      {/* Icône mute/unmute en bas */}
      <div className="player-bottom-bar">
        <button onClick={() => console.log('toggle mute')}>
          Mute
        </button>
      </div>

      {/* Texte machine à écrire */}
      <div className="text-overlay">
        <TypewriterText text={currentText} />
      </div>

      {/* Boutons “swipe” de test */}
      <div className="swipe-controls">
        <button onClick={handleSwipeRight}>◀ (swipe right)</button>
        <button onClick={handleSwipeLeft}>▶ (swipe left)</button>
      </div>
    </div>
  );
}
