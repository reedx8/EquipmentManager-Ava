import { useEffect, useState } from 'react';
// import supabase from '@/app/config/supabaseClient';
import styles from '@/app/equipment/equipment.module.css';

export default function TopCards({ data }) {
    const [equipmentCount, setEquipmentCount] = useState(0);
    const [storeCounts, setStoreCounts] = useState({
        Hall: 0,
        Barrows: 0,
        Kruse: 0,
        Orenco: 0,
        Bakery: 0,
        Office: 0,
        Warehouse: 0,
    });

    useEffect(() => {
        setEquipmentCount(data.length);

        let hall, barrows, kruse, orenco, bakery, office, warehouse;
        hall = barrows = kruse = orenco = bakery = office = warehouse = 0;

        for (let i = 0; i < data.length; i++) {
            if (data[i].Store_Name === 'Hall') {
                ++hall;
            } else if (data[i].Store_Name === 'Barrows') {
                ++barrows;
            } else if (data[i].Store_Name === 'Kruse') {
                ++kruse;
            } else if (data[i].Store_Name === 'Orenco') {
                ++orenco;
            } else if (data[i].Store_Name === 'Bakery') {
                ++bakery;
            } else if (data[i].Store_Name === 'Office') {
                ++office;
            } else if (data[i].Store_Name === 'Warehouse') {
                ++warehouse;
            }
        }
        setStoreCounts({
            Hall: hall,
            Barrows: barrows,
            Kruse: kruse,
            Orenco: orenco,
            Bakery: bakery,
            Office: office,
            Warehouse: warehouse,
        });

        /*
        async function fetchCounts() {
            const fetchStoreCount = async (storeName) => {
                let { data, error } = await supabase
                    .from('Equipment')
                    .select('id', { count: 'exact' })
                    .eq('Store_Name', storeName);

                if (error) {
                    console.log('Error: ', error);
                    return 0;
                }
                return data.length;
            };

            const storeNames = ['Hall', 'Barrows', 'Kruse', 'Orenco'];
            const counts = await Promise.all(
                storeNames.map((name) => fetchStoreCount(name))
            );

            setStoreCounts((prevCounts) => ({
                ...prevCounts,
                Hall: counts[0],
                Barrows: counts[1],
                Kruse: counts[2],
                Orenco: counts[3],
            }));
        }
        fetchCounts();
        */
        console.log('TopCards: useEffect ran');
    }, [data]);

    return (
        <div className={styles.card}>
            <div className={styles.totalCount}>
                <p className={styles.cardNumber}>{equipmentCount}</p>
                <p className={styles.cardLabel}>Total Equipment</p>
            </div>
            <div className={styles.middlePane}>
                <div className={styles.cardRow}>
                    <p>Hall</p>
                    <p>{storeCounts.Hall}</p>
                </div>
                <div className={styles.cardRow}>
                    <p>Barrows</p>
                    <p>{storeCounts.Barrows}</p>
                </div>
                <div className={styles.cardRow}>
                    <p>Kruse</p>
                    <p>{storeCounts.Kruse}</p>
                </div>
                <div className={styles.cardRow}>
                    <p>Orenco</p>
                    <p>{storeCounts.Orenco}</p>
                </div>
            </div>
            <div className={styles.rightPane}>
                <div className={styles.cardRow}>
                    <p>Bakery</p>
                    <p>{storeCounts.Bakery}</p>
                </div>
                <div className={styles.cardRow}>
                    <p>Office</p>
                    <p>{storeCounts.Office}</p>
                </div>
                <div className={styles.cardRow}>
                    <p>Warehouse</p>
                    <p>{storeCounts.Warehouse}</p>
                </div>
            </div>
        </div>
    );
}
