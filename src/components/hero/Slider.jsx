// Slider.jsx
import React from 'react';
import { ArrowBigLeftIcon, ArrowBigRightIcon } from 'lucide-react';

export default function Slider({ item, onNext, onPrev, showNextMessage, showPrevMessage }) {
  const style = {
    backgroundImage: `url(${item.bg})`,
  };

  return (
    <div className='slider' style={style}>
      <div className='hero-title'>{item.type}</div>
      <p className='hero-description'>{item.description}</p>

      <button className='prev-slide-btn' onClick={onPrev}>
        <ArrowBigLeftIcon />
      </button>
      <button className='next-slide-btn' onClick={onNext}>
        <ArrowBigRightIcon />
      </button>

      {showNextMessage && <div className="end-message">Last slide reached</div>}
      {showPrevMessage && <div className="end-message">First slide reached</div>}

    </div>
  );
}