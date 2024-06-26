import styles from './settings.module.css';
import Sidebar from '../Components/sidebar';
import HeaderBar from '../Components/header';

export default function Settings() {
    return (
        <>
            <Sidebar />
            <HeaderBar />
            <div className={styles.pageContent}>
                <section>
                    <p>Settings Page</p>
                </section>
            </div>
        </>
    );
}
