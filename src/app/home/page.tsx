'use client'
import css from './style.module.css';
import Navbar from '../../components/navbar';
import { useState, useEffect } from 'react';
import axios from '../../apis/axios';

const HomePage = ({session} : any) => {
    const [typedWord, setTypedWord] = useState('');
    const [typedWordDefinition, setTypedWordDefinition] = useState('');
    const [typedWordType, setTypedWordType] = useState('');
    const [isSuccessfulSaved, setIsSuccessfulSaved] = useState('failed');
    const hasNumber = /\d/;

    let userWordData : any = [];
    let userWordDataJson;

    useEffect(() => {
        setTypedWord('');
        setTypedWordDefinition('');
        setTypedWordType('');
        setTimeout(() => {setIsSuccessfulSaved('failed')}, 3000);
    }, [isSuccessfulSaved])

    const handleSubmit = (e : any) => {
        e.preventDefault();
        if(!hasNumber.test(typedWord)) {
            saveWord(typedWord, typedWordDefinition, typedWordType);
        }
        else {
            setIsSuccessfulSaved('error')
        }
    }

    const saveWord = (word : string, pressedWordDefinition: string, pressedWordType: string) => {
        const email = session.data?.user?.email?.replaceAll('.', ',');
        axios.get(`/users/${email}/words.json`).then(res => {
            userWordDataJson = res.data;
            userWordData = Array.of(userWordDataJson);
            console.log('get', userWordData[0]);
        }).then(() => {
            if(userWordData[0] != null && userWordData != null) {
                let sameWord = 0;
                for(var i=1; i<userWordData[0].length; i++) {
                    if(userWordData[0][i].english === word) {
                        sameWord = 1;
                        break;
                    }
                }
                if(!sameWord) {
                    userWordData = [
                        ...userWordData[0],
                        {
                            english: word,
                            mongolian: pressedWordDefinition,
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
                userWordData = [
                    {
                        english: word,
                        mongolian: pressedWordDefinition,
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
                        <h1>Хүссэн үгээ цээжилцгээе</h1>    
                        <p>Өөрийн оруулсан шинэ үгсээ сонирхолтой аргаар чээжил</p>
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
                        <select className={css.inputStyle} name='wordType' value={typedWordType} onChange={(e) => {setTypedWordType(e.target.value);}} required>
                            <option value="" disabled selected>Чээжлэх үгийн төрлийг оруулна уу...</option>
                            <option>Noun</option>
                            <option>Verb</option>
                            <option>Adjective</option>
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

export default HomePage;