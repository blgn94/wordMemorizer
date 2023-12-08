/**
*   Flashcard бүрэлдэхүүн хэсэг
*   
*   Энэ бүрэлдэхүүн хэсэг нь үг болон түүний орчуулгыг харуулсан флаш картыг төлөөлдөг.
*   Энэ нь орчуулгыг ард талд нь үзэхийн тулд картыг эргүүлэх боломжийг хэрэглэгчдэд олгоно.
*   
*   Properties:
*   - vocabulary: Серверээс татаж авсан хэрэглэгчийн үгийн сангийн өгөгдлийг агуулсан массив.
*   - index: Үгийн сангийн массив дахь одоогийн үгийн индекс.
*   - isCardFlipped: Буль нь картыг эргүүлсэн эсэхийг илэрхийлдэг.
*   - setIsCardFlipped: isCardFlipped-ийн төлөвийг тохируулах функц.
*   
*   Функцууд:
*   - handleCardClick: Карт дээр товших үед isCardFlipped-ийн төлөвийг сэлгэнэ.
*/

import { useEffect, useState } from 'react';
import css from './style.module.css';

const Flashcard = ({ vocabulary, index, isCardFlipped, setIsCardFlipped } : any) => {
  // Флэш карт дээрх товшилтыг зохицуулах функц нь картыг эргүүлэх төлөвийг шилжүүлдэг
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
