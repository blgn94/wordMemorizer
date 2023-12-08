/**
*   FlashcardList Бүрэлдэхүүн хэсэг:
*
*   Энэ бүрэлдэхүүн хэсэг нь програмын Flashcard жагсаалтын хэсгийг төлөөлдөг. Энэ нь флэш картуудыг харуулж, сургалтын явцыг хянаж, хэрэглэгчийн харилцааг зохицуулдаг.
*
*   Properties:
*   - vocabulary: Үг, тодорхойлолт агуулсан картуудын массив.
*   - setWhichMenuClicked: Үндсэн бүрэлдэхүүн хэсгийн идэвхтэй цэсийг шинэчлэх функц.
*   - LearningCount: Хэрэглэгчийн сурсан флаш картын тоо.
*   - setLearningCount: Эцэг эхийн бүрэлдэхүүн дэх сургалтын тоог шинэчлэх функц.
*
*   State:
*   - whichWord: Харуулж буй одоогийн флаш картын индекс.
*   - isCardFlipped: Флэш картыг эргүүлсэн эсэхийг хянах логик төлөв.
*   - knowCount: Хэрэглэгчийн "мэддэг" гэж тэмдэглэсэн флаш картуудын тоо.
*
*   Функцууд:
*   - knowButtonHandle: "Мэдэх" товчийг дарахад зохицуулна. Боломжтой бол дараагийн флаш карт руу шилжих эсвэл хожсон хуудас руу шилжинэ.
*   - LearningButtonHandle: "Сурах" товчийг товшилтоор зохицуулна. Боломжтой бол дараагийн флаш карт руу шилжих эсвэл хожсон хуудас руу шилжинэ.
*/
import { useState } from 'react';
import css from './style.module.css';
import Flashcard from "../flashcard";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faCheck} from '@fortawesome/free-solid-svg-icons';
import { faXmark} from '@fortawesome/free-solid-svg-icons';

const FlashcardList = ({ vocabulary, setWhichMenuClicked, learningCount, setLearningCount} : any) => {
    const [ whichWord, setWhichWord ] = useState(0);
    const [isCardFlipped, setIsCardFlipped] = useState(false);
    const [ knowCount, setKnowCount ] = useState(0);

    const knowButtonHandle = () => {
        if(vocabulary[0]) {
            if(whichWord < vocabulary.length - 1) {
                setWhichWord(whichWord + 1);
                setKnowCount(knowCount + 1);
            }
            else if(whichWord == vocabulary.length - 1) {
                setKnowCount(knowCount + 1);
                setWhichMenuClicked('flashcardWinningPage');
            }
        }
    }

    const learningButtonHandle = () => {
        if(vocabulary[0]) {
            if(whichWord < vocabulary.length - 1) {
                setWhichWord(whichWord + 1);
                setLearningCount(learningCount + 1);
            }
            else if(whichWord == vocabulary.length - 1) {
                setLearningCount(learningCount + 1);
                setWhichMenuClicked('flashcardWinningPage');
            }
        }
    }

    return (
        <div>
            <div className={css.flashcardContainer}>
                {
                    (vocabulary !== undefined && vocabulary !== null) ?
                    <div className={css.scoreSection}>
                        <p className={css.learningText}>{learningCount} Learning</p>
                        <p>{whichWord+1}/{vocabulary.length}</p>
                        <p className={css.knowText}>{knowCount} know</p>
                    </div> :
                    <div className={css.scoreSection}>
                        <p className={css.learningText}>0 Learning</p>
                        <p>{0}/{0}</p>
                        <p className={css.knowText}>0 know</p>
                    </div>
                }
                <Flashcard vocabulary={vocabulary} index={whichWord} isCardFlipped={isCardFlipped} setIsCardFlipped={setIsCardFlipped} />
                {
                    (vocabulary !== undefined && vocabulary !== null) ?
                    <div className={css.flashcardButtons}>
                        <div className={css.faXmark} onClick={() => {learningButtonHandle(); if(isCardFlipped) setIsCardFlipped(false)}}>
                            <FontAwesomeIcon width={30} icon={faXmark} />
                        </div>
                        <div className={css.faCheck} onClick={() => {knowButtonHandle(); if(isCardFlipped) setIsCardFlipped(false)}}>
                            <FontAwesomeIcon width={30} icon={faCheck} />
                        </div>
                    </div> :
                    <div className={css.flashcardButtons}>
                        <div className={css.faXmark}>
                            <FontAwesomeIcon width={30} icon={faXmark} />
                        </div>
                        <div className={css.faCheck} >
                            <FontAwesomeIcon width={30} icon={faCheck} />
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default FlashcardList;
