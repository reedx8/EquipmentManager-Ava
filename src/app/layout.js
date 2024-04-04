// 'use client';
import { Inter } from 'next/font/google';
import styles from './page.module.css';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Equipment Manager',
    description: 'Equipment Manager web app, AVA Roasteria',
};

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <body className={inter.className}>
                {/* <Sidebar /> */}
                {/* <HeaderBar /> */}
                <main className={styles.mainLayout}>{children}</main>
            </body>
        </html>
    );
}
