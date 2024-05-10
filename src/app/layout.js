// 'use client';
import { Archivo } from 'next/font/google';
import styles from './page.module.css';
import './globals.css';

const customFont = Archivo({ subsets: ['latin'] });

export const metadata = {
    title: 'EQUIP',
    description: 'Equipment Manager for Ava Roasteria',
};

// Rootlayout is the top level layout component for the app (children = pages/components)
export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <body className={customFont.className}>
                {/* <Sidebar /> */}
                {/* <HeaderBar /> */}
                <main className={styles.mainLayout}>{children}</main>
            </body>
        </html>
    );
}
