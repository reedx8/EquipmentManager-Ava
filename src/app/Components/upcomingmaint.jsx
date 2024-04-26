'use client';
import { useEffect, useState } from 'react';
import React from 'react';
import styles from '../styles/upcomingmaint.module.css';
import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';
import { BsTelephone } from 'react-icons/bs';
import supabase from '../config/supabaseClient';
import Image from 'next/image';
import calIcon from '../assets/cal_icon.png';
import calBg from '../assets/cal-bg.png';

export default function UpcomingMaint() {
    return (
        <div>
            <h1 className={styles.heading}>Upcoming Maintenance</h1>
            <div className={styles.dateCard}>
                {/* <Image src={calBg} className={styles.calBg} /> */}
                <div className={styles.dateCardSide}>
                    <p className={styles.day}>
                        5<sup className={styles.daySupertext}>th</sup>
                    </p>
                    <p className={styles.month}>July</p>
                    <div className={styles.circle}>
                        <Image src={calIcon} width={30} height={30} />
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
