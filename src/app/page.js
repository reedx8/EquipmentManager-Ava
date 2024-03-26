'use client';
import Image from 'next/image';
import styles from './page.module.css';
import AuthForm from './auth/auth-form';
import HomeTopCards from './Components/hometopcards';
import NeedsRepair from './Components/needsrepair';
import UpcomingMaint from './Components/upcomingmaint';
import Todo from './Components/todo';

export default function Home() {
    return (
        <div className={styles.pageContent}>
            <section className={styles.topCardSection}>
                <HomeTopCards />
            </section>
            <section>
                <NeedsRepair />
            </section>
            <section className={styles.bottomSection}>
                <UpcomingMaint />
                <Todo />
            </section>
        </div>
    );
}
