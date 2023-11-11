'use client'
import { signOut } from 'next-auth/react';
import css from './style.module.css';

const LogOutButton = () => {
    return (
        <button className={css.LogOutButton} onClick={() => signOut()}>Гарах</button>
    );
}

export default LogOutButton;