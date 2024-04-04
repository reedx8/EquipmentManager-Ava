import styles from './schedule.module.css';
import Sidebar from '../Components/sidebar';
import HeaderBar from '../Components/header';

// Schedule page
export default function Schedule() {
    return (
        <>
            <Sidebar />
            <HeaderBar />
            <div className={styles.pageContent}>
                <section>Schedule page</section>
            </div>
        </>
    );
}
