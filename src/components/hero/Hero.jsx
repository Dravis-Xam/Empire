// Hero.jsx
import React, { useState, useEffect } from 'react';
import "./hero.css";
import Slider from './Slider';
import heroUpdates from "../../modules/HeroUpdates";

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showNextMessage, setShowNextMessage] = useState(false);
  const [showPrevMessage, setShowPrevMessage] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev < heroUpdates.length - 1 ? prev + 1 : 0));
    }, 180000); // 3 minutes

    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    if (currentIndex < heroUpdates.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setShowNextMessage(true);
      setTimeout(() => setShowNextMessage(false), 2000);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      setShowPrevMessage(true);
      setTimeout(() => setShowPrevMessage(false), 2000);
    }
  };

  return (
    <section className='Hero'>
      <Slider 
        item={heroUpdates[currentIndex]}
        onNext={handleNext}
        onPrev={handlePrev}
        showNextMessage={showNextMessage}
        showPrevMessage={showPrevMessage}
      />
      
      <div className='slide-nav'>
        {heroUpdates.map((_, index) => (
          <button 
            key={index}
            className={`nav-btn ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </section>
  );
}