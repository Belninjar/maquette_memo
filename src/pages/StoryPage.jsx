import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useStoriesLoader from '../hooks/useStoriesLoader';
import StoryCover from '../components/StoryCover';
import TransitionOverlay from '../components/TransitionOverlay';
import StoryPlayer from '../components/StoryPlayer';

export default function StoryPage() {
  const { storyId } = useParams();
  const navigate = useNavigate();
  const stories = useStoriesLoader();

  // On attend que stories soit chargé
  if (stories.length === 0) {
    return <p>Chargement en cours...</p>;
  }

  // Chercher la story correspondant à storyId
  const storyData = stories.find(s => s.storyId === storyId);
  if (!storyData) {
    return <p>Histoire introuvable</p>;
  }

  const [phase, setPhase] = useState('cover'); 
  // phases possibles: 'cover' | 'transition' | 'player'

  function handleClickOnCoverImage() {
    // On passe en phase 'transition' => après 2 secondes, on passe en 'player'
    setPhase('transition');
    setTimeout(() => {
      setPhase('player');
    }, 2000);
  }

  // Quand on swipe la dernière image => retour à l'accueil
  function handleExitStory() {
    navigate('/');
  }

  return (
    <div className="story-page">
      {phase === 'cover' && (
        <StoryCover
          coverText={storyData.textData.cover || ''}
          storyId={storyId}
          onClickImage={handleClickOnCoverImage}
        />
      )}

      {phase === 'transition' && <TransitionOverlay logoDuration={2000} />}

      {phase === 'player' && (
        <StoryPlayer
          storyId={storyId}
          textData={storyData.textData}
          onExit={handleExitStory}
        />
      )}
    </div>
  );
}
