'use client';
import { useEffect, useState } from 'react';
import styles from '@/app/styles/home/upcomingmaint.module.css';
import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';
import { BsTelephone } from 'react-icons/bs';
import Image from 'next/image';
import calIcon from '/public/icons/cal_icon.png';
import supabase from '@/app/config/supabaseClient';

// Needs async function for some random reason
export default function UpcomingMaint() {
    const [itemDetails, setItemDetails] = useState({
        name: '--',
        comments: '',
        // phone: '',
        // email: '',
        store: '',
        day: '',
        month: '',
    });
    // const [upcomingMaint, setUpcomingMaint] = useState({
    //     day: '--',
    //     month: '--',
    // });

    useEffect(() => {
        // const getUpcomingMaint = async () => {
        //     let today = new Date().toISOString().slice(0, 10); // format as "YYYY-MM-DD"

        //     let { error, data } = await supabase
        //         .from('Events')
        //         .select('date')
        //         .gte('date', today)
        //         .eq('type_id', 2)
        //         .order('date', { ascending: true });

        //     if (error) {
        //         console.log('error', error);
        //     }
        //     if (data) {
        //         if (data.length === 0) {
        //             return; // no upcoming maintenance
        //         }

        //         const date = new Date(data[0].date);
        //         const dayDate = date.getDate();
        //         const monthName = date.toLocaleString('default', {
        //             month: 'long',
        //         });
        //         setUpcomingMaint({ day: dayDate, month: monthName });
        //     }
        // };

        const getItemDetails = async () => {
            let today = new Date().toISOString().slice(0, 10); // format as "YYYY-MM-DD"
            let { error, data } = await supabase
                .from('Events')
                .select(
                    `
                    date,
                    comments,
                    Equipment:equip_id (Name, Store_Name)`
                )
                .gte('date', today)
                .eq('type_id', 2)
                .order('date', { ascending: true })
                .limit(1);
            if (error) {
                console.log('Error:', error);
                return;
            }
            // console.log('data: ', data[0]);

            const date = new Date(data[0].date);
            const dayDate = date.getDate();
            const monthName = date.toLocaleString('default', {
                month: 'long',
            });

            setItemDetails({
                name: data[0].Equipment.Name,
                comments: data[0].comments,
                store: data[0].Equipment.Store_Name,
                day: dayDate,
                month: monthName,
            });
        };
        getItemDetails();
        // getUpcomingMaint();
    }, []);
    return (
        <div>
            <h1 className={styles.heading}>Upcoming Maintenance</h1>
            <div className={styles.dateCard}>
                {/* <Image src={calBg} className={styles.calBg} /> */}
                <div className={styles.dateCardSide}>
                    <p className={styles.day}>
                        {itemDetails.day}
                        {/* <sup className={styles.daySupertext}>th</sup> */}
                    </p>
                    <p className={styles.month}>{itemDetails.month}</p>
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
                    <h1>{itemDetails.store}</h1>
                    <h3>{itemDetails.name}</h3>
                    <p>{itemDetails.comments}</p>
                    <div className={styles.dateCardContact}>
                        {/* <div className={styles.phone}>
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
                        </div> */}
                    </div>
                </div>
                {/* <Image src={calBg} className={styles.calBg} /> */}
            </div>
        </div>
    );
}
