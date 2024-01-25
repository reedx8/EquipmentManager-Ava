'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './page.module.css'
import AuthForm from './auth/auth-form'
import FetchData from './Components/fetch-data'
import supabase from './config/supabaseClient'
import Header from './Components/header'
import Sidebar from './Components/sidebar'

async function fetchNeedRepairs(){
  const res = await fetch('https://ivfblcajuujuywzdsihd.supabase.co');
  if (!res.ok){
    throw new Error('Failed to fetch needs repair equipment')
  }
  const data = await res.json();

  // return res.json();
}

export default function Home() {
  const [fetchError, setFetchError] = useState(null);
  const [needsRepairEquip, setNeedsRepairEquip] = useState(null);

  useEffect(() => {
    const fetchNeedsRepair = async () => {
      const { data, error } = await supabase
        .from('Equipment')
        .select()
        .eq('Needs_Repair', 'TRUE');

        if (error){
          setFetchError('Couldnt fetch equipment');
          setNeedsRepairEquip(null);
          console.log(error)
        }
        if (data){
          setNeedsRepairEquip(data);
          setFetchError(null);
        }
    }

    fetchNeedsRepair();
  })

  return (
    <>
      <main className={styles.main}>
        <div>
          <Sidebar/>
        </div>
        <Header/>
        <div className={styles.content}>
          <div className={styles.needsRepairStn}>
            <h1>Needs Repair</h1>
            {fetchError && (<p>{fetchError}</p>) }
            {needsRepairEquip && (
              <ul>
                {needsRepairEquip.map(equip => (
                  <li key={equip.id}>{equip.Name} -- {equip.Store_Name}</li>
                ))}
              </ul>
            )}
            {/* <FetchData /> */}
          </div>
        </div>
        {/* <AuthForm /> */}
      </main>
    </>
  )

  /* 
  boilerplate code below (to-delete):

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.js</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore starter templates for Next.js.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  )
  */
}
