import styles from '../styles/sidebar.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { FiHome, FiTool } from "react-icons/fi";
import { HiOutlineHome, HiOutlineCalendar } from "react-icons/hi";

export default function Sidebar(){
    return (
        <div className={styles.main}>
            <div className={styles.firstHalfSidebar}>
                <div>
                    <Link href='/'>
                        <HiOutlineHome className={styles.sidebarIcon} size={35}/>
                    </Link>
                    <div className={styles.sidebarLine}></div>
                </div>
                <div>
                    <Link href='/'>
                        <FiTool className={styles.sidebarIcon} size={35}/>
                    </Link>
                </div>
                <div>
                    <Link href='/'>
                        <HiOutlineCalendar className={styles.sidebarIcon} size={35}/>
                    </Link>
                </div>
            </div>
            <div className={styles.secondHalfSiderbar}>

            </div>
        </div>
    )
}