'use client'
import { useRouter } from 'next/navigation';
import css from './style.module.css';

const SignInButton = () => {
    const router = useRouter();
    const handleNavigation = () => {
        router.push('/signIn');
    }
    return (
        <button className={css.SignInButton} onClick={handleNavigation}>Нэвтрэх</button>
    );
}

export default SignInButton;