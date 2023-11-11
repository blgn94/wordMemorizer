'use client'
import { useEffect, useState } from 'react';
import css from './style.module.css';

const Flashcard = ({ vocabulary, index } : any) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };
  
  return (
    <div
      className={`${css.flashcard} ${isFlipped ? css.flipped : ''}`}
      onClick={handleCardClick}
    >
      <div className={css.flashcardInner}>
        <div className={css.flashcardFront}>
          {vocabulary ? <p>{vocabulary[index].english}</p> : <p>No words here</p>}
        </div>
        <div className={css.flashcardBack}>
          {vocabulary ? <p>{vocabulary[index].mongolian}</p> : <p>No translation here</p>}
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
