'use client';
import styles from '../styles/hometopcards.module.css';
import { GoTools } from 'react-icons/go';
import { LuCalendarClock } from 'react-icons/lu';
import { GrInProgress } from 'react-icons/gr';
import { MdOutlineNumbers } from 'react-icons/md';
import Image from 'next/image';
import wrench from '../assets/wrench.png';
import hashtag from '../assets/hashtag.png';
import time from '../assets/time.png';
import cal from '../assets/cal.png';
import { motion } from 'framer-motion';

export default function HomeTopCards() {
    return (
        <div className={styles.main}>
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                className={styles.card}
            >
                {/* <div className={styles.card}> */}
                <div>
                    {/* <MdOutlineNumbers /> */}
                    <Image src={hashtag} width={20} height={20} alt='# icon' />
                    <h2 className={styles.cardNumber}>56</h2>
                    <p className={styles.cardSubtitle}>Pcs. of Equipment</p>
                </div>
            </motion.div>
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                className={styles.cardWithPercent}
            >
                {/* <div className={styles.cardWithPercent}> */}
                <div>
                    {/* <GoTools /> */}
                    <Image
                        src={wrench}
                        width={20}
                        height={20}
                        alt='wrench icon'
                    />
                    <h2 className={styles.cardNumber}>5</h2>
                    <p className={styles.cardSubtitle}>Needs Repair</p>
                </div>
                <div className={styles.percentBox}>
                    <p className={styles.percentText}>0%</p>
                </div>
                {/* </div> */}
            </motion.div>
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                className={styles.cardWithPercent}
            >
                {/* <div className={styles.cardWithPercent}> */}
                <div>
                    {/* <GrInProgress /> */}
                    <Image src={time} width={20} height={20} alt='time icon' />
                    <h2 className={styles.cardNumber}>0</h2>
                    <p className={styles.cardSubtitle}>Being Repaired</p>
                </div>
                <div className={styles.percentBox}>
                    <p className={styles.percentText}>0%</p>
                </div>
                {/* </div> */}
            </motion.div>
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                className={styles.card}
            >
                {/* <div className={styles.card}> */}
                {/* <LuCalendarClock /> */}
                <Image src={cal} width={20} height={20} alt='calendar icon' />
                <h2 className={styles.cardNumber}>8/2/2024</h2>
                <p className={styles.cardSubtitle}>Next Repair Date</p>
                {/* </div> */}
            </motion.div>
        </div>
    );
}
