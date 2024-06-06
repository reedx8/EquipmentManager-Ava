'use client';
// 'use server';
import { useEffect, useState } from 'react';
import styles from '../styles/upcomingmaint.module.css';
import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';
import { BsTelephone } from 'react-icons/bs';
// import supabase from '../config/supabaseClient';
import Image from 'next/image';
import calIcon from '/public/icons/cal_icon.png';
import supabase from '../config/supabaseClient';

// Needs async function for some random reason
export default function UpcomingMaint() {
    const [upcomingMaint, setUpcomingMaint] = useState({
        day: '--',
        month: '--',
    });

    useEffect(() => {
        const getUpcomingMaint = async () => {
            let today = new Date().toISOString().slice(0, 10); // format as "YYYY-MM-DD"

            let { error, data } = await supabase
                .from('Events')
                .select('date')
                .gte('date', today)
                .eq('type_id', 2)
                .order('date', { ascending: true });

            if (error) {
                console.log('error', error);
            }
            if (data) {
                if (data.length === 0) {
                    return; // no upcoming maintenance
                }

                const date = new Date(data[0].date);
                const dayDate = date.getDate();
                const monthName = date.toLocaleString('default', {
                    month: 'long',
                });
                // console.log('monthName: ', monthName);
                // console.log('dayDate: ', dayDate);
                setUpcomingMaint({ day: dayDate, month: monthName });
            }
        };
        getUpcomingMaint();
    }, []);
    return (
        <div>
            <h1 className={styles.heading}>Upcoming Maintenance</h1>
            <div className={styles.dateCard}>
                {/* <Image src={calBg} className={styles.calBg} /> */}
                <div className={styles.dateCardSide}>
                    <p className={styles.day}>
                        {upcomingMaint.day}
                        <sup className={styles.daySupertext}>th</sup>
                    </p>
                    <p className={styles.month}>{upcomingMaint.month}</p>
                    <div className={styles.circle}>
                        <Image
                            src={calIcon}
                            width={30}
                            height={30}
                            alt='calendar icon'
                        />
                    </div>
                </div>
                <div className={styles.dateCardInfo}>
                    <h1>Hall</h1>
                    <h3>Espresso Machine</h3>
                    <p>
                        Info here about what needs to be serviced for
                        maintenance
                    </p>
                    <div className={styles.dateCardContact}>
                        <div className={styles.phone}>
                            <BsTelephone
                                className={styles.icon}
                                style={{ fontSize: '1.5rem' }}
                            />
                            <span>(503) 555-5555</span>
                        </div>
                        <div>
                            <AiOutlineMail
                                className={styles.icon}
                                style={{ fontSize: '1.5rem' }}
                            />
                        </div>
                    </div>
                </div>
                {/* <Image src={calBg} className={styles.calBg} /> */}
            </div>
        </div>
    );
}
