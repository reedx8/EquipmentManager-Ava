'use client';
import { useEffect, useState } from 'react';
import styles from '../styles/hometopcards.module.css';
import Image from 'next/image';
import wrench from '/public/icons/wrench.png';
import hashtag from '/public/icons/hashtag.png';
import time from '/public/icons/time.png';
import cal from '/public/icons/cal.png';
import { motion } from 'framer-motion';
import supabase from '../config/supabaseClient';
import { set } from 'date-fns';

export default function HomeTopCards() {
    const [equipmentCount, setEquipmentCount] = useState(0);
    const [repairsCount, setRepairsCount] = useState(0);
    const [beingRepairedCount, setBeingRepairedCount] = useState(0);
    const [nextRepairDate, setNextRepairDate] = useState('--');

    // get equipment count, number of repairs, being repaired, and next repair date
    useEffect(() => {
        const getEquipmentCount = async () => {
            let { error, data } = await supabase
                .from('Equipment')
                .select('id', { count: 'exact' });
            if (error) {
                console.log('error', error);
            }
            if (data) {
                // console.log('data: ', data.length);
                setEquipmentCount(data.length);
            }
        };

        const getRepairsCount = async () => {
            let { error, data } = await supabase
                .from('Equipment')
                .select('id')
                .eq('Status_id', 9);
            if (error) {
                console.log('error', error);
            }
            if (data) {
                // console.log('repair: ', data.length);
                setRepairsCount(data.length);
            }
        };
        const getBeingRepairedCount = async () => {
            let { error, data } = await supabase
                .from('Equipment')
                .select('id')
                .eq('Status_id', 4);
            if (error) {
                console.log('error', error);
            }
            if (data) {
                // console.log('being repaired: ', data.length);
                setBeingRepairedCount(data.length);
            }
        };
        const getNextRepairDate = async () => {
            let today = new Date().toISOString().slice(0, 10); // format as "YYYY-MM-DD"

            let { error, data } = await supabase
                .from('Events')
                .select('date')
                .gte('date', today)
                .eq('type_id', 1)
                .order('date', { ascending: true });

            if (error) {
                console.log('error', error);
            }
            if (data) {
                if (data.length === 0) {
                    return; // no upcoming repairs
                }

                const date = new Date(data[0].date);
                const formattedDate =
                    date.getMonth() +
                    1 +
                    '/' +
                    date.getDate() +
                    '/' +
                    date.getFullYear();

                setNextRepairDate(formattedDate);
                // console.log('next repair date: ', data[0].date);
                // console.log('formatted date: ', formattedDate);
            }
        };

        getEquipmentCount();
        getRepairsCount();
        getBeingRepairedCount();
        getNextRepairDate();
    }, []);

    return (
        <div className={styles.main}>
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className={styles.card}
            >
                {/* <div className={styles.card}> */}
                <div>
                    {/* <MdOutlineNumbers /> */}
                    <Image src={hashtag} width={20} height={20} alt='# icon' />
                    <h2 className={styles.cardNumber}>{equipmentCount}</h2>
                    <p className={styles.cardSubtitle}>Pcs. of Equipment</p>
                </div>
            </motion.div>
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
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
                    <h2 className={styles.cardNumber}>{repairsCount}</h2>
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
                transition={{ duration: 0.5 }}
                className={styles.cardWithPercent}
            >
                {/* <div className={styles.cardWithPercent}> */}
                <div>
                    {/* <GrInProgress /> */}
                    <Image src={time} width={20} height={20} alt='time icon' />
                    <h2 className={styles.cardNumber}>{beingRepairedCount}</h2>
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
                transition={{ duration: 0.5 }}
                className={styles.card}
            >
                {/* <div className={styles.card}> */}
                {/* <LuCalendarClock /> */}
                <Image src={cal} width={20} height={20} alt='calendar icon' />
                <h2 className={styles.cardNumber}>{nextRepairDate}</h2>
                <p className={styles.cardSubtitle}>Next Repair Date</p>
                {/* </div> */}
            </motion.div>
        </div>
    );
}
