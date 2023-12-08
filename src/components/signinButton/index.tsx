'use client'
import { useRouter } from 'next/navigation';
import css from './style.module.css';

// Энэ бүрэлдэхүүн хэсэг нь дарахад хэрэглэгч нэвтрэх хуудас руу шилжих товчлуурыг төлөөлдөг.
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