import { useEffect, useState } from 'react';
import css from './style.module.css';

const Flashcard = ({ vocabulary, index, isCardFlipped, setIsCardFlipped } : any) => {
  const handleCardClick = () => {
    setIsCardFlipped(!isCardFlipped);
  };
  
  return (
    <div
      className={`${css.flashcard} ${isCardFlipped ? css.flipped : ''}`}
      onClick={handleCardClick}
    >
      {
        (vocabulary !== undefined && vocabulary !== null) ?
        <div className={css.flashcardInner}>
          <div className={css.flashcardFront}>
            <p>{vocabulary[index].wordEn} ({vocabulary[index].type})</p>
          </div>
          <div className={css.flashcardBack}>
            <p>{vocabulary[index].definitionMn}</p>
          </div>
        </div> :
        <div className={css.flashcardInner}>
          <div className={css.flashcardFront}>
            <p>No words</p>
          </div>
          <div className={css.flashcardBack}>
            <p>No translation</p>
          </div>
        </div>
      }
    </div>
  );
};

export default Flashcard;
