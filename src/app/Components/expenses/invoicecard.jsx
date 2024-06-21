'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import hashtag from '/public/icons/hashtag.png';
import wrench from '/public/icons/wrench.png';
import { HiOutlineWrenchScrewdriver } from 'react-icons/hi2';
import styles from '@/app/styles/expenses/invoicecard.module.css';
import { BiMoneyWithdraw } from 'react-icons/bi';
import { GrMoney } from 'react-icons/gr';
import { MdAttachMoney } from 'react-icons/md';
import { PiBuildings } from 'react-icons/pi';
import { TbBuildingStore } from 'react-icons/tb';
import supabase from '@/app/config/supabaseClient';

export default function InvoiceCard({ type }) {
    const [count, setCount] = useState(0);
    const [costliestItem, setCostliestItem] = useState(null);
    const [mostServiced, setMostServiced] = useState(null);
    const [costliestStore, setCostliestStore] = useState(null);
    const [fetchError, setFetchError] = useState(null);

    useEffect(() => {
        if (type === 'count') {
            fetchCount();
        }

        async function fetchCount() {
            let { data, error } = await supabase
                .from('Invoices')
                .select('id', { count: 'exact' });
            if (error) {
                setFetchError('Couldnt fetch invoice count');
                console.log('Fetch Error: ', fetchError);
                return;
            }
            setCount(data.length);
        }
    }, [type, fetchError]);

    function renderDetails() {
        if (type === 'count') {
            return (
                <div className={styles.card}>
                    <div className={styles.topRow}>
                        <Image
                            src={hashtag}
                            alt='count'
                            width={20}
                            height={20}
                        />
                        <h2 className={styles.cardData}>{count}</h2>
                    </div>
                    <p className={styles.cardTitle}>Total Invoices</p>
                </div>
            );
        } else if (type === 'costliestItem') {
            return (
                <div className={styles.cardWithNum}>
                    <div>
                        <div className={styles.topRow}>
                            <MdAttachMoney style={{ fontSize: '20px' }} />
                            <h2 className={styles.cardDataText}>Item</h2>
                        </div>
                        <p className={styles.cardTitle}>Costliest Item</p>
                    </div>
                    <div className={styles.numberColumn}>
                        <p>$00.00</p>
                    </div>
                </div>
            );
        } else if (type === 'mostServiced') {
            return (
                <div className={styles.cardWithNum}>
                    <div>
                        <div className={styles.topRow}>
                            <HiOutlineWrenchScrewdriver
                                style={{ fontSize: '20px' }}
                            />
                            <h2 className={styles.cardDataText}>Item</h2>
                        </div>
                        <p className={styles.cardTitle}>Most Serviced</p>
                    </div>
                    <div className={styles.numberColumn}>
                        <p>0</p>
                    </div>
                </div>
            );
        } else if (type === 'costliestStore') {
            return (
                <div className={styles.cardWithNum}>
                    <div>
                        <div className={styles.topRow}>
                            <TbBuildingStore style={{ fontSize: '20px' }} />
                            <h2 className={styles.cardDataText}>Store</h2>
                        </div>
                        <p className={styles.cardTitle}>Costliest Store</p>
                    </div>
                    <div className={styles.numberColumn}>
                        <p>$00.00</p>
                    </div>
                </div>
            );
        } else {
            return (
                <div className={styles.card}>
                    <p>Invalid input</p>
                </div>
            );
        }
    }

    return <>{renderDetails()}</>;
}
