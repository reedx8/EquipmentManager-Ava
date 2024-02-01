import Header from './Components/header'
import Sidebar from './Components/sidebar'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Equipment List',
  description: 'Equipment List App by AVA Roasteria',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Sidebar/>
        <Header/>
        <main className={styles.mainLayout}>
          {children}
        </main>
      </body>
    </html>
  )
}

/*
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
*/
