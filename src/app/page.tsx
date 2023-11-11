'use client'
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

import css from './page.module.css';
import HomePage from './home/page';

export default function Home() {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/signIn');
    }
  });
  return (
    <main className={css.mainBox}>
      <HomePage session={session} />
    </main>
  )
}

Home.requireAuth = true;