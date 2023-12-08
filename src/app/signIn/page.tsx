/**
*   SignInPage бүрэлдэхүүн хэсэг
*
*   Энэ бүрэлдэхүүн хэсэг нь хэрэглэгчдэд итгэмжлэлээ оруулах боломжтой нэвтрэх хуудсыг төлөөлдөг
*   нэвтрэх. Үүнд цахим шуудан, нууц үг оруулах маягт, "Нууц үгээ март" холбоос,
*   "Одоо бүртгүүлэх" холбоос, итгэмжлэл эсвэл Google-ээр нэвтрэх товчлуурууд.
*
*   Ашигласан бүрэлдэхүүн хэсгүүд:
*   - Navbar: Navigation bar бүрэлдэхүүн хэсэг.
*
*   Properties:
*   - email: Хэрэглэгчийн имэйлийн оролт.
*   - password: Хэрэглэгчийн нууц үг оруулт.
*
*   Функцууд:
*   - signIn: "Нэвтрэх" товчийг дарснаар NextAuth signIn-ийг итгэмжлэлээр ашиглаж, амжилттай болсны 
*   дараа нүүр хуудас руу дахин чиглүүлэх үед функц идэвхждэг.
*/

'use client'
import { signIn } from 'next-auth/react';
import { useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';

import css from './style.module.css';
import Navbar from '@/components/navbar';

const SignInPage = () => {
    // Имэйл болон нууц үгийн оролтын төлөвийн хувьсагч
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Нэвтрэх хуудсыг төлөөлөх JSX элементүүд
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
                <div className={css.signSection}>
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
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                            required
                        ></input>
                        <div className={css.rightSideText}>
                            <Link href={'/forgetPassword'}><p className={css.textGrey}>Forget Password</p></Link>
                            <Link href={'/signUp'}><p className={css.textGrey}>Not a member? <span className={css.registerStyle}>Register Now</span></p></Link>
                        </div>
                        <button
                            className={css.buttonStyle}
                            onClick={() => {signIn('credentials', {email, password, redirect: true, callbackUrl: '/'})}}
                            disabled={!email || !password}
                            type="button"
                        >
                            Sign In
                        </button>
                        <p className={css.textGrey}>Or continue with</p>
                        <button 
                            className={css.googleButton}
                        >
                            <Image className={css.imageStyle} width={25} height={25} src='/googleIcon.png' alt='google icon' />Login with google
                        </button>
                    {/* </form> */}
                </div>
            </div>
        </div>
    );
}

export default SignInPage;