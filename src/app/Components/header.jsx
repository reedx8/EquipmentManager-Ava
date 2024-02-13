'use client';
import { useEffect, useState } from 'react';
import styles from '../styles/header.module.css';
import { usePathname } from 'next/navigation';

export default function Header() {
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
            <p>{pathname}</p>
            <p>AVA Roasteria</p>
        </div>
    );
}
