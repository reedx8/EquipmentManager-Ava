// 'use client';
// import { useEffect, useState, useRef } from 'react';
import styles from '../styles/header.module.css';
import { usePathname } from 'next/navigation';
import headerImage from '../assets/header_ava.png';
import Image from 'next/image';
import title from '../assets/title.png';
import title2 from '../assets/title2.png';
import Link from 'next/link';

// Header bar for all pages except login
export default function HeaderBar() {
    /*
    // this is what i used:
    const [pathname, setPathname] = useState('');
    let name = usePathname();

    useEffect(() => {
        if (name == '/') {
            setPathname('Dashboard');
        } else {
            name = name.slice(1);
            name = name.charAt(0).toUpperCase() + name.slice(1);
            setPathname(name);
        }
    }, [name]);
    */

    /*
    let pathName = usePathname();

    if (pathName == '/') {
        pathName = 'Dashboard';
    } else {
        pathName = usePathname().slice(1);
        pathName = pathName.charAt(0).toUpperCase() + pathName.slice(1);
    }
    */

    return (
        <div className={styles.main}>
            {/* <p>Equipment Manager</p> */}
            {/* <Link href='/'>
                <Image
                    src={title2}
                    alt='Equipment Manager'
                    height={40}
                    width={230}
                />
            </Link> */}

            <Link href='/'>
                <Image
                    src={headerImage}
                    alt='AVA Roasteria Logo'
                    height={50}
                    width={60}
                />
            </Link>

            {/* <p>{pathname}</p> */}
            {/* <p>AVA Roasteria</p> */}
        </div>
    );
}
