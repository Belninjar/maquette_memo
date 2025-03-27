import React from 'react';
import { Link } from 'react-router-dom';
import useStoriesLoader from '../../hooks/useStoriesLoader';
import CarouselHome from '../components/CarouselHome';

export default function HomePage() {
  const stories = useStoriesLoader();

  // Pour chaque story, on affiche la cover. On n'a pas l'image de cover en .txt, 
  // mais on sait que c'est "cover.jpg" dans le même dossier => on recompose le path.
  // ex: /src/assets/story1/cover.jpg => On peut le charger en dynamique si besoin. 

  // Simplifions: on passe la liste d'IDs au carousel
  return (
    <div className="home-page">
      <h1>Bienvenue sur My Story App</h1>
      {stories.length === 0 ? (
        <p>Chargement en cours...</p>
      ) : (
        <CarouselHome stories={stories} />
      )}
    </div>
  );
}
