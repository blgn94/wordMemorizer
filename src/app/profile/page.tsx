/**
*   Профайлын бүрэлдэхүүн хэсэг
*
*   Энэ бүрэлдэхүүн хэсэг нь Flashcards, Mini Game, Vocabulary зэрэг өөр өөр хэсгүүдэд хандах боломжийг олгодог үндсэн хэрэглэгчийн профайл хуудсыг төлөөлдөг.
*
*   Гол онцлог:
*   - NextAuth.js сессийг ашиглан хэрэглэгчийн баталгаажуулалт.
*   - Сонгосон цэсэнд суурилсан динамик контент дүрслэл.
*   - Axios ашиглан серверээс хэрэглэгчийн тусгай үгсийн сангийн өгөгдлийг татаж авдаг.
*   - Flashcards, Mini Game, Vocabulary List зэрэг дэд бүрэлдэхүүн хэсгүүдийг нэгтгэдэг.
*
*   Дэд бүрэлдэхүүн хэсгүүд:
*   - Navbar: Профайлын мэдээлэл бүхий хэрэглэгчийн навигацийн мөрийг харуулна.
*   - FlashcardCongrats: Flashcards бөглөсний дараа баяр хүргэх дэлгэц.
*   - MiniGameStart: Мини тоглоомыг эхлүүлэх бүрэлдэхүүн хэсэг.
*   - MiniGameProcess: Мини тоглоом тоглох бүрэлдэхүүн хэсэг.
*   - VocabularyList: Хэрэглэгчийн цуглуулсан үгсийн санг харуулна.
*   - FlashcardList: Flashcards хэсгийг удирдаж, хэрэглэгчдэд интерактив байдлаар үгсийг сурах боломжийг олгоно.
*   - MiniGameБаяр хүргэе: Мини тоглоомыг дуусгасны дараа баяр хүргэх дэлгэц.
*
*   Төлөвийн хувьсагч:
*   - whichMenuClicked: Одоо сонгогдсон цэсийг хянадаг.
*   - vocabulary: Серверээс татаж авсан хэрэглэгчийн үгийн сангийн өгөгдлийг хадгална.
*   - LearningCount: Flashcards эсвэл Mini Game-ийн үеэр сурсан үгсийн тоог хянадаг.
*   - moves: Mini Game-д хийсэн нүүдлийн тоог хянадаг.
*   - email: API хүсэлтийн хэрэглэгчийн сессээс гаргаж авсан имэйл хаяг.
*
*   Функцууд:
*   - changeContent: Сонгосон цэсийг шинэчилж, learningCount-ыг дахин тохируулна.
*/

'use client'
import css from './style.module.css';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import axios from '../../apis/axios';

import Navbar from '@/components/navbar';
import FlashcardCongrats from '@/components/flashcardCongrats';
import MiniGameStart from '@/components/miniGameStart';
import MiniGameProcess from '@/components/miniGameProcess';
import VocabularyList from '@/components/vocabularyList';
import FlashcardList from '@/components/flashcardList';
import MiniGameCongrats from '@/components/miniGameCongrats';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faBoltLightning } from '@fortawesome/free-solid-svg-icons';
import { faNoteSticky } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
    // Хэрэглэгчийн session өгөгдлийг авахын тулд NextAuth session ашиглах
    const session = useSession({
        required: true,
        onUnauthenticated() {
            // Хэрэглэгчийг баталгаажуулаагүй тохиолдолд нэвтрэх хуудас руу дахин чиглүүлэх
            redirect('/signIn');
        }
    });

    // төлөв хувьсагч
    const [whichMenuClicked, setWhichMenuClicked] = useState('vocabulary');
    const [vocabulary, setVocabulary] : any = useState([]);
    const [learningCount, setLearningCount] = useState(0);
    const [moves, setMoves] = useState(0);
    const [email, setEmail] = useState(session.data?.user?.email?.replaceAll('.', ','));

    // Имэйл өөрчлөгдөх үед хэрэглэгчийн үгсийн сангийн өгөгдлийг дуудах
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

    // Сонгосон цэсийн зүйл дээр үндэслэн агуулгыг өөрчлөх
    const changeContent = (whichContent : any) => {
        setWhichMenuClicked(whichContent);
        setLearningCount(0);
    }

    // Хэрэглэгчийн профайл хуудсыг төлөөлөх JSX элементүүд
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
                whichMenuClicked === 'miniGameStart' && <MiniGameStart changeContent={changeContent} vocabulary={vocabulary} />
            }
            {
                whichMenuClicked === 'miniGameProcess' && <MiniGameProcess vocabulary={vocabulary} setWhichMenuClicked={setWhichMenuClicked} moves={moves} setMoves={setMoves} />
            }
            {
                whichMenuClicked === 'miniGameWinningPage' && <MiniGameCongrats moves={moves} changeContent={changeContent} />
            }
            {
                whichMenuClicked === 'flashcards' && <FlashcardList vocabulary={vocabulary} setWhichMenuClicked={setWhichMenuClicked} learningCount={learningCount} setLearningCount={setLearningCount} />
            }
            {
                whichMenuClicked === 'flashcardWinningPage' && <FlashcardCongrats learning={learningCount} total={vocabulary.length} changeContent={changeContent}/>
            }
        </div>
    );
}

export default Profile;