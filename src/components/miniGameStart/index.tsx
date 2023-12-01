import css from './style.module.css';
import Image from 'next/image';

const MiniGameStart = ({changeContent, vocabulary} : any) => {
    return(
        <div className={css.miniGameStartContianer}>
            <Image className={css.pictureStyle} src='/miniGameStart.png' alt='Mini game start image' width={150} height={150} />
            <div className={css.startGameText}>
                <h1 className={css.readyToPlayTitle}>Reedy to play?</h1>
                <p className={css.greyText}>Match all the terms with their definition as fast as you can.</p>
                <p className={css.greyText}>Avoid wrong matches, they add extra time!</p>
            </div>
            {
                (vocabulary !== undefined && vocabulary !== null && vocabulary.length >= 8) ?
                <div className={css.startGameButton} onClick={() => changeContent('miniGameProcess')}>Эхлэх</div> :
                <div className={css.noVocabulary}>Таны үгийн сан хоосон эсвэл хүрэлцээгүй байна.</div>
            }
        </div>
    );
}

export default MiniGameStart;