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
    const [email, setEmail] = useState('');
    const router = useRouter();
    const handleNavigation = () => {
        router.push('/signIn');
    }
    const resetPassword = () => {
        sendPasswordResetEmail(auth, email);
        router.push('/signIn')
    }
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
                </div>
            </div>
        </div>
    );
}

export default ForgetPassword;