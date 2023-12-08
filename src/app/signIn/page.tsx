'use client'
import { signIn } from 'next-auth/react';
import { useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';

import css from './style.module.css';
import Navbar from '@/components/navbar';

const SignInPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
                </div>
            </div>
        </div>
    );
}

export default SignInPage;