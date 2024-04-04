import styles from '../styles/sidebar.module.css';
import Link from 'next/link';
// import Image from 'next/image';
import { FiHome, FiTool } from 'react-icons/fi';
import { HiOutlineHome, HiOutlineCalendar } from 'react-icons/hi';
import { RiSettings3Fill } from 'react-icons/ri';

// Sidebar for all pages except login
export default function Sidebar() {
    return (
        <div className={styles.main}>
            <div className={styles.upperSidebar}>
                <div>
                    <Link href='/'>
                        <HiOutlineHome
                            className={styles.sidebarIcon}
                            size={35}
                        />
                    </Link>
                    <div className={styles.sidebarLine}></div>
                </div>
                <div>
                    <Link href='/equipment'>
                        <FiTool className={styles.sidebarIcon} size={35} />
                    </Link>
                </div>
                <div>
                    <Link href='/schedule'>
                        <HiOutlineCalendar
                            className={styles.sidebarIcon}
                            size={35}
                        />
                    </Link>
                </div>
            </div>
            <div className={styles.lowerSidebar}>
                <div>
                    <Link href='/settings'>
                        <RiSettings3Fill
                            className={styles.lowerBtns}
                            size={35}
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
}
