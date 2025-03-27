import React, { useState } from 'react';

export default function StoryCover({ coverText, storyId, onClickImage }) {
  const coverPath = new URL(`../assets/${storyId}/cover.jpg`, import.meta.url).href;
  const [textOpen, setTextOpen] = useState(false);

  function toggleText() {
    setTextOpen(!textOpen);
  }

  return (
    <div className="story-cover">
      <div className="cover-image" onClick={onClickImage}>
        <img src={coverPath} alt="cover" />
      </div>

      <div className={`text-panel ${textOpen ? 'open' : ''}`}>
        <div className="text-content">
          <p>{coverText}</p>
        </div>
        <button className="pull-handle" onClick={toggleText}>
          {textOpen ? 'Fermer' : 'Afficher le texte'}
        </button>
      </div>
    </div>
  );
}
