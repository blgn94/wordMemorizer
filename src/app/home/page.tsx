/**
*   Нүүр хуудасны бүрэлдэхүүн хэсэг
*
*   Энэ бүрэлдэхүүн хэсэг нь хэрэглэгчид сурахад зориулж шинэ үг оруулах, хадгалах үндсэн хуудсыг төлөөлдөг.
*
*   - State:
*     - typedWord: Сурах үгийн оруулах талбар.
*     - typedWordDefinition: Үгийн тодорхойлолтыг оруулах талбар.
*     - typedWordType: Үгийн төрлийг сонгох унадаг цэс (Noun, Verb, Adjective, Adverb).
*     - isSuccessfulSaved: Хадгалах үйлдлийн төлөвийг (амжилттай, бүтэлгүйтсэн эсвэл анхны төлөв) заана.
*     - userWordData: Серверээс авсан хэрэглэгчийн үгийн өгөгдлийг хадгалах массив.
*     - userWordDataJson: userWordData-н JSON дүрслэлийг агуулна.
*
*   - Үр дүн:
*     - Оруулсан талбаруудыг арилгаж, хадгалсны дараа Амжилттай Хадгалагдсан (isSuccessfulSaved) гэдгийг дахин тохируулна.
*
*   - Функцууд:
*     - handleSubmit: Маягт илгээхийг зохицуулж, хэрэв оролт хүчинтэй бол үг хадгалахыг идэвхжүүлнэ.
*     - saveWord: Сервер дээрх хэрэглэгчийн жагсаалтад шинэ үгийг хадгална.
*     - handleCardClick: Flashcard товчлуур дээр дарах үйл явдлыг зохицуулдаг.
*    
*   - Гадаад хамаарал:
*     - React: Бүрэлдэхүүн хэсгийн төлөвийг удирдахад төлөв болон эффектийн дэгээг ашигладаг.
*     - axios: Асинхрон HTTP хүсэлтийг зохицуулдаг.
*/

'use client'
import css from './style.module.css';
import Navbar from '../../components/navbar';
import { useState, useEffect } from 'react';
import axios from '../../apis/axios';

const HomePage = ({session} : any) => {
    // Оролтын талбарууд болон амжилт/алдааны мэдэгдлүүдийг удирдах хувьсагчдын төлөв
    const [typedWord, setTypedWord] = useState('');
    const [typedWordDefinition, setTypedWordDefinition] = useState('');
    const [typedWordType, setTypedWordType] = useState('');
    const [isSuccessfulSaved, setIsSuccessfulSaved] = useState('failed');
    const hasNumber = /\d/;

    // Хэрэглэгчийн үгийн өгөгдлийг хадгалах массив
    let userWordData : any = [];
    let userWordDataJson;

    // Оролтын талбарууд болон саатсаны дараа амжилт/алдааны мэдэгдлүүдийг арилгах эффект
    useEffect(() => {
        setTypedWord('');
        setTypedWordDefinition('');
        setTypedWordType('');
        setTimeout(() => {setIsSuccessfulSaved('failed')}, 3000);
    }, [isSuccessfulSaved])

    // Маягт илгээхийг зохицуулах
    const handleSubmit = (e : any) => {
        e.preventDefault();
        // Үгэнд тоо байгаа эсэхийг шалгана
        if(!hasNumber.test(typedWord)) {
            saveWord(typedWord, typedWordDefinition, typedWordType);
        }
        else {
            setIsSuccessfulSaved('error')
        }
    }

    // Хэрэглэгчийн өгөгдөлд үгийг хадгалах функц
    const saveWord = (word : string, pressedWordDefinition: string, pressedWordType: string) => {
        const email = session.data?.user?.email?.replaceAll('.', ',');
        // Хэрэглэгчийн үгийн өгөгдлийг серверээс авах
        axios.get(`/users/${email}/words.json`).then(res => {
            userWordDataJson = res.data;
            userWordData = Array.of(userWordDataJson);
            console.log('get', userWordData[0]);
        }).then(() => {
            if(userWordData[0] != null && userWordData != null) {
                let sameWord = 0;
                // Тухайн үг хэрэглэгчийн үгийн жагсаалтад байгаа эсэхийг шалгах
                for(var i=1; i<userWordData[0].length; i++) {
                    if(userWordData[0][i].english === word) {
                        sameWord = 1;
                        break;
                    }
                }
                // Хэрэглэгчийн үгийн жагсаалтад үгийг нэмж, сервер дээр шинэчилэх
                if(!sameWord) {
                    userWordData = [
                        ...userWordData[0],
                        {
                            wordEn: word,
                            definitionMn: pressedWordDefinition,
                            type: pressedWordType
                        },
                    ];
                    axios.put(`/users/${email}/words.json`, userWordData).then(res => {
                        setIsSuccessfulSaved('successed');
                        console.log('put', res.data);
                    })
                    .catch(error => {
                        setIsSuccessfulSaved('error');
                        console.log('Data saving error...', error);
                    })
                }
                else {
                    alert(word + " is already included in your new word list !!!")
                    console.log(word + " is already included!!!");
                }
            }
            else {
                // Хэрэв хэрэглэгчийн үгийн өгөгдөл байхгүй бол шинэ массив үүсгээд сервер дээр шинэчилэх
                userWordData = [
                    {
                        wordEn: word,
                        definitionMn: pressedWordDefinition,
                        type: pressedWordType
                    },
                ];
                axios.put(`/users/${email}/words.json`, userWordData).then(res => {
                    setIsSuccessfulSaved('successed');
                    console.log('put', res.data);
                })
            }
        });
    }

    // Нүүр хуудасны бүрэлдэхүүн хэсгийг үзүүлэх
    return (
        <div className={css.HomePage}>
            <div className={css.darkLayer}>
                <Navbar session={session} />
                <div className={css.background}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className={css.mainSection}>
                    <div className={css.titleSection}>
                        <p>Өөрийн оруулсан шинэ үгсээ сонирхолтой аргаар чээжил</p>
                        <p>Хүссэн үгээ цээжилцгээе</p>
                    </div>
                    <form className={css.formStyle} onSubmit={handleSubmit}>
                        <input
                            className={css.inputStyle}
                            type='text'
                            name='word'
                            value={typedWord}
                            onChange={(e) => {setTypedWord(e.target.value);}}
                            placeholder='Чээжлэх үгээ оруулна уу...'></input>
                        <input
                            className={css.inputStyle}
                            type='text'
                            name='wordDefinition'
                            value={typedWordDefinition}
                            onChange={(e) => {setTypedWordDefinition(e.target.value);}}
                            placeholder='Чээжлэх үгийн утгыг оруулна уу...'></input>
                        <select value={typedWordType} className={css.inputStyle} name='wordType' onChange={(e) => {setTypedWordType(e.target.value);}} required>
                            <option value='' disabled>Чээжлэх үгийн төрлийг оруулна уу...</option>
                            <option value='Noun'>Noun</option>
                            <option value='Verb'>Verb</option>
                            <option value='Adjective'>Adjective</option>
                            <option value='Adverb'>Adverb</option>
                        </select>
                        <button className={css.formButton} type='submit'>Хадгалах</button>
                    </form>
                    {isSuccessfulSaved === 'successed' && <p className={css.isSuccessfulSaved}>Амжилттай хадгалагдлаа!</p>}
                    {isSuccessfulSaved === 'error' && <p className={css.isFailedSaved}>Хадгалж чадсангүй!</p>}
                </div>
            </div>
        </div>
    );
}

// Нүүр хуудасны бүрэлдэхүүн хэсгийг экспортлох
export default HomePage;