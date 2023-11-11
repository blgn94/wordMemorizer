'use client'
import css from './style.module.css';
import Image from 'next/image';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons';

const FlashcardCongrats = ( {learning, total, changeContent} : any ) => {
    return(
        <div className={css.congratsContainer}>
            <div className={css.congratsSection}>
                <h1>Amazing! Congratulations</h1>
                <Image src='/congrats.png' alt='congrats image' width={100} height={100} />
            </div>
            <div className={css.reviewContainer}>
                <FontAwesomeIcon className={css.reviewIcon} width={30} icon={faRotateRight} />
                <div className={css.reviewTextContainer}>
                    <h1>Review the though terms</h1>
                    <p className={css.smallGreyTexts}>Review flashcards again with {learning} terms you`ve still learning</p>
                </div>
            </div>
            <div className={css.restartContainer} onClick={() => changeContent("flashcards")}>
                <FontAwesomeIcon className={css.restartIcon} width={30} icon={faCheckDouble} />
                <div className={css.restartTextContainer}>
                    <h1>Restart Flashcards</h1>
                    <p className={css.smallGreyTexts}>Study all {total} terms again from the beginning</p>
                </div>
            </div>
        </div>
    );
}

export default FlashcardCongrats;