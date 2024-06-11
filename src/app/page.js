import styles from './page.module.css';
import HomeTopCards from '@/app/Components/home/hometopcards';
import NeedsRepair from '@/app/Components/home/needsrepair';
import UpcomingMaint from '@/app/Components/home/upcomingmaint';
import Todo from '@/app/Components/home/todo';
import Sidebar from './Components/sidebar';
import HeaderBar from './Components/header';

/**
 * Home Page, or Dashboard
 * @returns {JSX.Element} Home Page
 */
export default function Home() {
    return (
        <>
            <Sidebar />
            <HeaderBar />
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
        </>
    );
}
