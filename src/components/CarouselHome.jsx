import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Carousel.css';

export default function CarouselHome({ stories }) {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Suppose qu'on a un style "slider" horizontal
  // On va lier un "nextSlide()" et "prevSlide()" aux boutons.

  function nextSlide() {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  }

  function prevSlide() {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      setCurrentIndex(stories.length - 1);
    }
  }

  return (
    <div className="carousel-container" ref={carouselRef}>
      {/* Bouton Prev */}
      <button onClick={prevSlide} className="carousel-btn btn-prev">
        ◀
      </button>

      <div className="carousel-slide">
        {stories.map((story, index) => {
          const isActive = index === currentIndex;
          // Chemin de la cover => On suppose structure: `/src/assets/${story.storyId}/cover.jpg`
          const coverPath = new URL(`../assets/${story.storyId}/cover.jpg`, import.meta.url).href;

          return (
            <div
              key={story.storyId}
              className={`slide-item ${isActive ? 'active' : 'inactive'}`}
            >
              {isActive && (
                <Link to={`/story/${story.storyId}`}>
                  <img src={coverPath} alt={`cover of ${story.storyId}`} />
                </Link>
              )}
            </div>
          );
        })}
      </div>

      {/* Bouton Next */}
      <button onClick={nextSlide} className="carousel-btn btn-next">
        ▶
      </button>
    </div>
  );
}
