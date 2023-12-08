/**
*   MiniGameCongrats бүрэлдэхүүн хэсэг
*   -----------------------------------
*   Энэхүү бүрэлдэхүүн хэсэг нь мини-тоглоом амжилттай дууссаны дараа баяр хүргэх мессежийг харуулах үүрэгтэй.
*   Энэ нь хэрэглэгчийг ижил зорилгод хүрэхийн тулд цөөхөн нүүдэл хийж рекордыг эвдэхийг хичээдэг.
*   
*   Properties:
*   - moves: Мини-тоглоом дахь хэрэглэгчийн хийсэн нүүдлийн тоо.
*   - changeContent: Үндсэн бүрэлдэхүүн хэсгийн агуулга эсвэл төлөвийг өөрчлөх буцаан дуудлагын функц 
*                    бөгөөд ихэвчлэн мини-тоглоом эхлэх дэлгэц рүү буцахад ашигладаг.
*/

import css from './style.module.css';
import Image from 'next/image';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faCheckDouble } from '@fortawesome/free-solid-svg-icons';

const MiniGameCongrats = ( {moves, changeContent} : any ) => {
    return(
        <div className={css.congratsContainer}>
            <div className={css.congratsSection}>
                <div className={css.congratsTitle}>
                    <h1>Nice work! Can you match even less moves?</h1>
                    <p className={css.greyText}>Try and beat your record of {moves} moves.</p>
                </div>
                <Image className={css.congratsPicture} src='/congrats.png' alt='congrats image' width={100} height={100} />
            </div>
            <div className={css.playAgain} onClick={() => changeContent("miniGameStart")}>
                <FontAwesomeIcon className={css.restartIcon} width={30} icon={faCheckDouble} />
                <div className={css.restartTextContainer}>
                    <h1>Play again</h1>
                </div>
            </div>
        </div>
    );
}

export default MiniGameCongrats;