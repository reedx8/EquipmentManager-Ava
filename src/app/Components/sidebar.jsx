import styles from '../styles/sidebar.module.css';
import Link from 'next/link';
// import Image from 'next/image';
import { FiHome, FiTool } from 'react-icons/fi';
import { HiOutlineHome, HiOutlineCalendar } from 'react-icons/hi';
import { RiSettings3Fill } from 'react-icons/ri';
import Image from 'next/image';
import dash from '../assets/dash.png';
import hammer from '../assets/hammer.png';
import cal_icon from '../assets/cal_icon.png';

// Sidebar for all pages except login
export default function Sidebar() {
    return (
        <div className={styles.main}>
            <div className={styles.upperSidebar}>
                <div>
                    <Link href='/'>
                        <Image
                            src={dash}
                            width={35}
                            height={35}
                            className={styles.sidebarIcon}
                        />
                        {/* <HiOutlineHome
                            className={styles.sidebarIcon}
                            size={35}
                        /> */}
                    </Link>
                    <div className={styles.sidebarLine}></div>
                </div>
                <div>
                    <Link href='/equipment'>
                        <Image
                            src={hammer}
                            width={35}
                            height={35}
                            className={styles.sidebarIcon}
                        />
                        {/* <FiTool className={styles.sidebarIcon} size={35} /> */}
                    </Link>
                </div>
                <div>
                    <Link href='/schedule'>
                        <Image
                            src={cal_icon}
                            width={35}
                            height={35}
                            className={styles.sidebarIcon}
                        />
                        {/* <HiOutlineCalendar
                            className={styles.sidebarIcon}
                            size={35}
                        /> */}
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
