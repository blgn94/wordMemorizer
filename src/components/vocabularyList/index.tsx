/**
*   VocabularyList бүрэлдэхүүн хэсэг
*   
*   Энэ бүрэлдэхүүн хэсэг нь хэрэглэгчийн үгсийн сангаас цуглуулсан үгсийн жагсаалтыг харуулдаг.
*   Энэ нь хэрэглэгчдэд үгсийг устгах боломжийг олгодог бөгөөд үгийг устгах үед ачаалах эргүүлэгчийг харуулдаг.
*   Жагсаалт нь үг, төрөл, монгол орчуулга, устгах товчлууртай харагдана.
*   
*   Properties:
*   - vocabulary: Хэрэглэгчийн үгсийн сан дахь үгийн массив.
*   - seccion: Хэрэглэгчийн сессийн мэдээлэл.
*/

import { useState, useEffect } from 'react';
import axios from '../../apis/axios';
import CircularProgress from '@mui/material/CircularProgress'
import css from './style.module.css';

const VocabularyList = ({vocabulary, session} : any) => {
    const [isSuccessfulDeleted, setIsSuccessfulDeleted] = useState(false);
    const deleteWordFromDB = (word : any) => {
        const email = session.data?.user?.email?.replaceAll('.', ',');
        if(vocabulary != null) {
            for(var i=0; i<vocabulary.length; i++) {
                if(vocabulary[i].wordEn === word) {
                    vocabulary.splice(i, 1);
                    break;
                }
            }
            axios.put(`/users/${email}/words.json`, vocabulary).then(res => {
                setIsSuccessfulDeleted(true);
                console.log('delete', res.data);
            })
        }
    }

    useEffect(() => {
        setTimeout(() => {setIsSuccessfulDeleted(false)}, 1000);
    }, [isSuccessfulDeleted])

    return (
        <div>
            <div className={css.titleSection}>
                <h1>Collected words</h1>
                {isSuccessfulDeleted && <CircularProgress size={30}/>}
            </div>
            <div className={css.vocabularySection}>
                {
                    (vocabulary !== undefined && vocabulary !== null) ? vocabulary?.map((item : any) => {
                        return(
                            <div key={item.wordEn} className={css.wordContainer}>
                                <div className={css.wordStyle}>
                                    <span className={css.exactWordStyle}>{`${item.wordEn} (${item.type})`}</span> {" - "} <span className={css.mongolianWordStyle}>{item.definitionMn}</span>
                                </div>
                                <button className={css.deleteButton} onClick={() => deleteWordFromDB(item.wordEn)}>X</button>
                            </div>
                        );
                    }) : 
                    <div className={css.wordContainer}>
                        <span>Хоосон байна!</span>
                    </div>
                }
            </div>
        </div>
    );
};

export default VocabularyList;