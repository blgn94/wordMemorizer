/**
*   Navbar бүрэлдэхүүн хэсэг
*   
*   Энэ бүрэлдэхүүн хэсэг нь програмын дээд хэсэгт байрлах навигацийн мөрийг төлөөлдөг.
*   Үүнд SubLingo лого, хэрэглэгчийн мэдээлэл, нэвтрэх/гарах товчлуурууд орно.
*   
*   Properties:
*   - seccion: Хэрэглэгчийн мэдээллийг агуулсан хэрэглэгчийн сессийн объект.
*/

'use client'
import Image from 'next/image';
import Link from 'next/link';

import css from './style.module.css';
import SignInButton from '../signinButton';
import LogOutButton from '../logoutButton';

const Navbar = ({session} : any) => {
    return (
        <div className={css.navbar}>
            <Link href={'/'} className={css.logoSection}>
                <Image src='/SubLingoLogo.png' alt='Sublingo logo' width={40} height={40} />
                <h1>SubLingo</h1>
            </Link>
            {/* <div>{session?.data?.user?.email}</div> */}
            {
                session?.data ? 
                <div className={css.profileSection}>
                    <div className={css.userName}>{session?.data?.user?.email.split('@')[0]}</div>
                    <Link href={'/profile'}>
                        <Image className={css.profileImg} src='/profileImg.jpg' alt='profile image' width={40} height={40} />
                    </Link>
                    <LogOutButton />
                </div> 
                : <SignInButton />
            }
        </div>
    );
}

export default Navbar;