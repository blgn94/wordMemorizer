/**
*   ForgetPassword бүрэлдэхүүн хэсэг
*   
*   Энэ бүрэлдэхүүн хэсэг нь "Нууц үгээ март" хуудсыг төлөөлдөг бөгөөд хэрэглэгчид нууц үгээ 
*   шинэчлэх холбоосыг хүлээн авахын тулд имэйлээ оруулах боломжтой. Энэ нь нууц үг шинэчлэх 
*   имэйл илгээхийн тулд Firebase баталгаажуулалтыг ашигладаг.
*   
*   Ашигласан бүрэлдэхүүн хэсгүүд:
*   - Navbar: Хэрэглэгчийн мэдээллийг харуулах навигацийн талбар.
*   
*   State:
*   - email: Нууц үг шинэчлэх хэрэглэгчийн имэйл хаягийг илэрхийлсэн мөр.
*   - router: Next.js чиглүүлэгчтэй программчлагдсан навигацийн объект.
*   
*   Функцууд:
*   - handleNavigation: Хэрэглэгчийг нэвтрэх хуудас руу буцаана.
*   - resetPassword: Оруулсан имэйл рүү нууц үг шинэчлэх имэйл илгээхийг идэвхжүүлнэ.
*/

'use client'
import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from "../firebase";
import { useRouter } from 'next/navigation';

import Navbar from '@/components/navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import css from './style.module.css';

import Link from 'next/link';
import Image from 'next/image';


const ForgetPassword = () => {
    // Хэрэглэгчийн имэйлийг хадгалах төлөв
    const [email, setEmail] = useState('');
    const router = useRouter();

    // Нэвтрэх хуудас руу буцах navigation зохицуулах функц
    const handleNavigation = () => {
        router.push('/signIn');
    }

    // Firebase баталгаажуулалтыг ашиглан нууц үгээ шинэчлэх функц
    const resetPassword = () => {
        sendPasswordResetEmail(auth, email);
        router.push('/signIn')
    }

    // ForgetPassword бүрэлдэхүүн хэсгийн JSX бүтэц
    return (
        <div className={css.HomePage}>
            <div className={css.darkLayer}>
                <Navbar />
                <div className={css.background}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className={css.forgetSection}>
                    <div className={css.toMoveLeftButton}>
                        <button className={css.backButton} onClick={handleNavigation}>
                            <FontAwesomeIcon icon={faArrowLeft} /> Back
                        </button>
                    </div>
                    <h1>Forget password?</h1>
                    <p className={css.textGrey}>Enter your email and change password!</p>
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
                        <button
                            className={css.buttonStyle}
                            onClick={() => {resetPassword()}}
                            disabled={!email}
                            type="button"
                        >
                            Sign In
                        </button>
                    {/* </form> */}
                </div>default
            </div>
        </div>
    );
}

// ForgetPassword бүрэлдэхүүн хэсгийг экспортлох
export default ForgetPassword;
