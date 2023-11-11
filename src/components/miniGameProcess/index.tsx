'use client'
import { randomInt } from 'crypto';
import css from './style.module.css';
import { useEffect, useState } from 'react';

const MiniGameSection = ( {vocabulary} : any ) => {
    let toggleItem = -1;
    let toggleOnOff = 'off';
    // const [ shuffledElements, setShuffledElements ] = useState([]);
    // const [toggleItem, setToggleItem] = useState(-1);
    // const [toggleOnOff, setToggleOnOff] = useState('off');
    const shuffledValues : any = [];
    const generateRandomWords = (min : any, max : any) => {
        const randomWords = [];
        const availableNumbers = Array.from({ length: max - min + 1 }, (_, i) => i + min);
        for(let i=0;  i<8; i++) 
            randomWords[i] = vocabulary.words[availableNumbers[i]];
        return randomWords;
    }
    const shuffleTheCards = (randomWords : any) => {
        const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        const cardsValues = [
            randomWords[0].word,
            randomWords[0].translation,
            randomWords[1].word,
            randomWords[1].translation,
            randomWords[2].word,
            randomWords[2].translation,
            randomWords[3].word,
            randomWords[3].translation,
            randomWords[4].word,
            randomWords[4].translation,
            randomWords[5].word,
            randomWords[5].translation,
            randomWords[6].word,
            randomWords[6].translation,
            randomWords[7].word,
            randomWords[7].translation,
        ];
        const shuffledCards = [];
        for(let i=0; i<16; i++) {
            shuffledValues[i] = cardsValues[shuffledArray[i]];
            shuffledCards[i] = <div key={cardsValues[shuffledArray[i]]} className={`${css.gridItem}`} onClick={() => handleClick(i)}>{cardsValues[shuffledArray[i]]}</div>;
        }
        return shuffledCards;
    }

    let generatedWords = generateRandomWords(0, vocabulary.words.length-1);
    let shuffledElements = shuffleTheCards(generatedWords);

    const handleClick = (index : number) => {
        if(toggleOnOff === 'off') {
            // setToggleItem(index);
            // setToggleOnOff('on');
            toggleItem = index;
            toggleOnOff = 'on';
            shuffledElements[index] = <div key={shuffledValues[index]} className={`${css.gridItem} ${css.activedCard}`} onClick={() => handleClick(index)}>{shuffledValues[index]}</div>;
        }
        else {
            if(toggleItem === index) {
                toggleOnOff = 'off';
                toggleItem = -1;
                // setToggleOnOff('off');
                // setToggleItem(-1);
                shuffledElements[index] = <div key={shuffledValues[index]} className={`${css.gridItem}`} onClick={() => handleClick(index)}>{shuffledValues[index]}</div>;
            }
        }
    }

    return(
        <div className={css.miniGameContainer}>
            <p className={css.time}>5.6 seconds</p>
            <div className={css.gameSection}>
                {shuffledElements.map((item: any) => {
                    return item;
                })}
            </div>
        </div>
    );
}

export default MiniGameSection;