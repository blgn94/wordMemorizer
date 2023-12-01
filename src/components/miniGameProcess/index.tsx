import css from './style.module.css';
import { useEffect, useState } from 'react';

const MiniGameSection = ( {vocabulary, setWhichMenuClicked, moves, setMoves} : any ) => {
  const boardEnglish = [   
      vocabulary[0].wordEn + '-> 🤖',
      vocabulary[1].wordEn + '-> 👽',
      vocabulary[2].wordEn + '-> 👻',
      vocabulary[3].wordEn + '-> 🤡',
      vocabulary[4].wordEn + '-> 🐧',
      vocabulary[5].wordEn + '-> 🦚',
      vocabulary[6].wordEn + '-> 😄',
      vocabulary[7].wordEn + '-> 🚀',
  ]
  const boardMongolian = [
      vocabulary[0].definitionMn + '-> 🤖',
      vocabulary[1].definitionMn + '-> 👽',
      vocabulary[2].definitionMn + '-> 👻',
      vocabulary[3].definitionMn + '-> 🤡',
      vocabulary[4].definitionMn + '-> 🐧',
      vocabulary[5].definitionMn + '-> 🦚',
      vocabulary[6].definitionMn + '-> 😄',
      vocabulary[7].definitionMn + '-> 🚀',
  ]
  const [boardData, setBoardData] : any = useState([]);
  const [flippedCards, setFlippedCards] : any = useState([]);
  const [matchedCards, setMatchedCards] : any = useState([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    initialize();
  }, []);

  const initialize = () => {
    shuffle();
    setGameOver(false);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
  };

  useEffect(() => {
    if (matchedCards.length == 16) {
      setGameOver(true);
      setWhichMenuClicked('miniGameWinningPage')
    }
  }, [moves]);

  const shuffle = () => {
    const shuffledCards : any = [...boardEnglish, ...boardMongolian].sort(() => Math.random() - 0.5).map((v) => v);
    setBoardData(shuffledCards);
  };

  const updateActiveCards = (i : any) => {
    if(!flippedCards.includes(i)) {
      if(flippedCards.length == 1) {
        const firstIdx = flippedCards[0];
        const secondIdx = i;
        if(boardData[firstIdx].split('->')[1] == boardData[secondIdx].split('->')[1]) {
          setMatchedCards((prev : any) => [...prev, firstIdx, secondIdx]);
        }
        setFlippedCards([...flippedCards, i]);
      }
      else if(flippedCards.length == 2) {
        setFlippedCards([i]);
      }
      else {
        setFlippedCards([...flippedCards, i]);
      }
      setMoves((v : any) => v + 1);
    }
  };

  return (
    <div className={css.container}>
        <div className={css.movesTitle}>
            <p>{`Moves: ${moves}`}</p>
        </div>
        <div className={css.board}>
            {boardData.map((data : any, i : any) => {
                const flipped = flippedCards.includes(i) ? true : false;
                const matched = matchedCards.includes(i) ? true : false;
                return (
                <div
                    onClick={() => {updateActiveCards(i);}}
                    key={i}
                    className={`${css.card} ${flipped || matched ? `${css.active}` : ""} ${matched ? `${css.matched}` : ""} ${gameOver ? `${css.gameover}` : ""}`}
                >
                    <div className={css.card_front}>{data}</div>
                    <div className={css.card_back}></div>
                </div>
                );
            })}
        </div>
        <div>
            <button onClick={() => initialize()} className={css.reset_btn}>
                Reset
            </button>
        </div>
    </div>
  );
}

export default MiniGameSection