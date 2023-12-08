/**
*   LogOutButton бүрэлдэхүүн хэсэг
*
*   Энэ бүрэлдэхүүн хэсэг нь хэрэглэгчдэд програмаас гарах боломжийг олгодог гарах товчлуурыг төлөөлдөг.
*   Энэ нь програмын хэрэглэгчийн интерфэйс дотор, ихэвчлэн навигацийн хэсэг эсвэл тохиргооны хэсэгт ашиглахаар бүтээгдсэн.
*/
'use client'
import { signOut } from 'next-auth/react';
import css from './style.module.css';

const LogOutButton = () => {
    return (
        <button className={css.LogOutButton} onClick={() => signOut()}>Гарах</button>
    );
}

export default LogOutButton;