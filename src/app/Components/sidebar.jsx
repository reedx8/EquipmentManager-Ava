'use client';
import styles from '../styles/sidebar.module.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { FiHome, FiTool } from 'react-icons/fi';
import { HiOutlineHome, HiOutlineCalendar } from 'react-icons/hi';
import { RiSettings3Fill } from 'react-icons/ri';
import Image from 'next/image';
import { BsWrenchAdjustableCircle } from 'react-icons/bs';
import { CiCalendarDate } from 'react-icons/ci';
import { BiSolidDashboard } from 'react-icons/bi';
import logo from '/public/logo.png';
import { IoPerson } from 'react-icons/io5';

// Sidebar for all pages except login
export default function Sidebar() {
    const [currentRoute, setCurrentRoute] = useState('/');

    const pathname = usePathname();
    useEffect(() => {
        setCurrentRoute(pathname);
    }, [pathname]);

    return (
        <div className={styles.main}>
            <div className={styles.upperSidebar}>
                <div className={styles.logoContainer}>
                    <Link href='/'>
                        <Image
                            src={logo}
                            width={120}
                            height={'auto'}
                            alt='Logo'
                            priority={true}
                        />
                    </Link>
                </div>
                <div>
                    {/* <Image src={logo} width={120} height={'auto'} alt='Logo' /> */}
                    <div className={styles.sidebarLine}></div>

                    <Link
                        href='/'
                        className={
                            currentRoute === '/'
                                ? styles.activeLink
                                : styles.sidebarLink
                        }
                    >
                        {/* <Image
                            src={dash}
                            width={35}
                            height={35}
                            className={styles.sidebarIcon}
                            alt='Dashboard page'
                        /> */}
                        <BiSolidDashboard
                            className={styles.sidebarIcon}
                            size={35}
                        />
                        <p>Home</p>
                        {/* <HiOutlineHome
                            className={styles.sidebarIcon}
                            size={35}
                        /> */}
                    </Link>
                    {/* <div className={styles.sidebarLine}></div> */}
                </div>
                <div>
                    <Link
                        href='/equipment'
                        className={
                            currentRoute === '/equipment'
                                ? styles.activeLink
                                : styles.sidebarLink
                        }
                    >
                        {/* <Image
                            src={hammer}
                            width={35}
                            height={35}
                            className={styles.sidebarIcon}
                            alt='Equipment page'
                        /> */}
                        <BsWrenchAdjustableCircle
                            className={styles.sidebarIcon}
                            size={35}
                        />
                        <p>Equipment</p>
                        {/* <FiTool className={styles.sidebarIcon} size={35} /> */}
                    </Link>
                </div>
                <div>
                    <Link
                        href='/schedule'
                        className={
                            currentRoute === '/schedule'
                                ? styles.activeLink
                                : styles.sidebarLink
                        }
                    >
                        {/* <Image
                            src={cal_icon}
                            width={35}
                            height={35}
                            className={styles.sidebarIcon}
                            alt='Schedule page'
                        /> */}
                        <CiCalendarDate
                            className={styles.sidebarIcon}
                            size={35}
                        />
                        <p>Schedule</p>
                        {/* <HiOutlineCalendar
                            className={styles.sidebarIcon}
                            size={35}
                        /> */}
                    </Link>
                </div>
                <div>
                    <Link
                        href='/providers'
                        className={
                            currentRoute === '/providers'
                                ? styles.activeLink
                                : styles.sidebarLink
                        }
                    >
                        <IoPerson className={styles.sidebarIcon} size={35} />
                        <p>Providers</p>
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
