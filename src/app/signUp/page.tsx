/**
*   SignUp бүрэлдэхүүн хэсэг
*   
*   Энэ бүрэлдэхүүн хэсэг нь хэрэглэгчид шинэ данс үүсгэх боломжтой бүртгүүлэх хуудсыг төлөөлдөг.
*   Энэ нь имэйл, нууц үг, нууц үг баталгаажуулах талбар бүхий маягтыг агуулдаг.
*   Хэрэглэгчид өөрсдийн цахим шуудан болон нууц үгээ ашиглан бүртгүүлэх боломжтой бөгөөд өгөгдлийг 
*   баталгаажуулахын тулд Firebase руу илгээдэг.
*   
*   Ашигласан бүрэлдэхүүн хэсгүүд:
*   - Navbar: Хэрэглэгчийн мэдээллийг харуулах навигацийн талбар.
*   
*   Properties:
*   - email: Хэрэглэгчийн имэйлийн оролт.
*   - password: Хэрэглэгчийн нууц үг оруулах.
*   - passwordAgain: Хэрэглэгчийн нууц үгийг баталгаажуулах оролт.
*   
*   Функцууд:
*   - handleNavigation: Хэрэглэгчийг нэвтрэх хуудас руу буцаана.
*   - бүртгүүлэх: Хэрэглэгчийн баталгаажуулалтад зориулж имэйл болон нууц үгийн өгөгдлийг Firebase руу илгээдэг.
*/

'use client'
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../firebase';

import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import css from './style.module.css';
import Navbar from '@/components/navbar';

const SignUp = () => {
    // Имэйл, нууц үг, нууц үгийн баталгаажуулалтын төлөвийн хувьсагч
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');
    const router = useRouter();
    
    // Хэрэглэгчийг нэвтрэх хуудас руу буцаана
    const handleNavigation = () => {
        router.push('/signIn');
    }

    // Хэрэглэгчийн баталгаажуулалтад зориулж имэйл болон нууц үгийн өгөгдлийг Firebase руу илгээдэх
    const signup = () => {
        createUserWithEmailAndPassword(auth, email, password);
        router.push('/signIn')
    };

    // Бүртгүүлэх хуудсыг төлөөлөх JSX элементүүд
    return(
        <div className={css.HomePage}>
            <div className={css.darkLayer}>
                <Navbar />
                <div className={css.background}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className={css.signUpSection}>
                    <div className={css.toMoveLeftButton}>
                        <button className={css.backButton} onClick={handleNavigation}>
                            <FontAwesomeIcon icon={faArrowLeft} /> Back
                        </button>
                    </div>
                    <h1>Welcome, Hello!</h1>
                    <p className={css.textGrey}>Welcome back you&lsquo;ve been missed!</p>
                    {/* <form className={css.formStyle}> */}
                        <input
                            className={css.inputStyle}
                            placeholder='Enter email'
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        ></input>
                        <input 
                            className={css.inputStyle}
                            placeholder='Password'
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        ></input>
                        <input
                            className={css.inputStyle}
                            placeholder='Confirm Password'
                            id="passwordAgain"
                            name="passwordAgain"
                            type="password"
                            autoComplete="current-password"
                            onChange={(e) => setPasswordAgain(e.target.value)}
                            required
                        ></input>
                        <button
                            className={css.buttonStyle}
                            disabled={(!email || !password || !passwordAgain) || (password !== passwordAgain)}
                            onClick={() => signup()}
                        >
                            Sign Up
                        </button>
                        <p className={css.textGrey}>Or continue with</p>
                        <button
                            className={css.googleButton}
                        >
                            <Image className={css.imageStyle} width={25} height={25} src='/googleIcon.png' alt='google icon' />Sign up with google
                        </button>
                    {/* </form> */}
                </div>
            </div>
        </div>
    );
}

export default SignUp;