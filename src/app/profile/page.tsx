'use client'
import css from './style.module.css';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import axios from '../../apis/axios';

import Navbar from '@/components/navbar';
import FlashcardCongrats from '@/components/flashcardCongrats';
import Flashcard from '@/components/flashcard';
import MiniGameStart from '@/components/miniGameStart';
import MiniGameProcess from '@/components/miniGameProcess';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faBoltLightning } from '@fortawesome/free-solid-svg-icons';
import { faNoteSticky } from '@fortawesome/free-solid-svg-icons';
import { faCheck} from '@fortawesome/free-solid-svg-icons';
import { faXmark} from '@fortawesome/free-solid-svg-icons';
import VocabularyList from '@/components/vocabularyList';
import FlashcardList from '@/components/flashcardList';

const Profile = () => {
    const session = useSession({
        required: true,
        onUnauthenticated() {
          redirect('/signIn');
        }
    });
    const [ whichMenuClicked, setWhichMenuClicked ] = useState('vocabulary');
    const [ whichWord, setWhichWord ] = useState(0);
    const [ learningCount, setLearningCount ] = useState(0);
    const [ knowCount, setKnowCount ] = useState(0);
    const [ vocabulary, setVocabulary ] : any = useState([]);
    const [ email, setEmail ] = useState(session.data?.user?.email?.replaceAll('.', ','));
    const [isCardFlipped, setIsCardFlipped] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios(`/users/${email}/words.json`);
            const dataArray = Array.of(response.data);
            setVocabulary(dataArray[0]);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, [email]);
    
      useEffect(() => {
        console.log('fetched data', vocabulary);
      }, [vocabulary]);

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

    const changeContent = (whichContent : any) => {
        setWhichMenuClicked(whichContent);
        setWhichWord(0);
        setLearningCount(0);
        setKnowCount(0);
    }

    return(
        <div className={css.backgroundStyle}>
            <Navbar session={session} />
            <div className={css.menuSection}>
                <div className={`${css.menuEachStyles} ${whichMenuClicked === 'flashcards' ? css.activeMenuEach : ''}`} onClick={() => changeContent("flashcards")}>
                    <FontAwesomeIcon className={css.flashcardsIcon} width={30} icon={faNoteSticky} />Flashcards
                </div>
                <div className={`${css.menuEachStyles} ${whichMenuClicked === 'miniGame' ? css.activeMenuEach : ''}`} onClick={() => changeContent("miniGameStart")}>
                    <FontAwesomeIcon className={css.miniGameIcon} width={30} icon={faBoltLightning} />Mini game
                </div>
                <div className={`${css.menuEachStyles} ${whichMenuClicked === 'vocabulary' ? css.activeMenuEach : ''}`} onClick={() => {
                    changeContent("vocabulary");
                }}>
                    <FontAwesomeIcon className={css.vocabularyIcon} width={30} icon={faBook} />Vocabulary
                </div>
            </div>
            {
                whichMenuClicked === 'vocabulary' && <VocabularyList vocabulary={vocabulary} session={session} />
            }
            {
                whichMenuClicked === 'flashcards' && <FlashcardList vocabulary={vocabulary} setWhichMenuClicked={setWhichMenuClicked} learningCount={learningCount} setLearningCount={setLearningCount} />
            }
            {
                whichMenuClicked === 'miniGameStart' && <MiniGameStart changeContent={changeContent} />
            }
            {
                whichMenuClicked === 'miniGameProcess' && <MiniGameProcess vocabulary={vocabulary} />
            }
            {
                whichMenuClicked === 'flashcardWinningPage' && <FlashcardCongrats learning={learningCount} total={vocabulary.length} changeContent={changeContent}/>
            }
        </div>
    );
}

export default Profile;