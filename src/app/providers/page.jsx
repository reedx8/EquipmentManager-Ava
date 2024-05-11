'use client';
import { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient';
import Sidebar from '../Components/sidebar';
import HeaderBar from '../Components/header';
import styles from './providers.module.css';
import ProvidersCard from '../Components/providersCard';
import { IoSearchSharp } from 'react-icons/io5';
import { CiViewTable } from 'react-icons/ci';
import { BsGrid3X3GapFill } from 'react-icons/bs';
import { FiMenu } from 'react-icons/fi';
import { IoGrid } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';

const info = [
    {
        name: 'Doordash', // <= 19 characters
        purpose: 'Food Delivery App', // <= 25 characters
        phone: '(855) 431-0459',
        email: null,
        website_url: 'https://www.doordash.com',
        menu_url: 'https://doordash.com/merchant',
        support_url: 'https://help.doordash.com/merchants/s/?language=en_US',
        gmaps_link: null,
        avatar_url:
            'https://ivfblcajuujuywzdsihd.supabase.co/storage/v1/object/public/avatars/doordash.jpg?t=2024-05-08T22%3A41%3A17.093Z',
    },
    {
        name: 'Uber Eats',
        purpose: 'Food Delivery App',
        phone: '1 (833) 275-3287',
        email: 'restaurants@uber.com',
        website_url: 'https://www.ubereats.com',
        menu_url: 'https://merchants.ubereats.com/manager',
        support_url:
            'https://help.uber.com/en/merchants-and-restaurants/article/contact-us?nodeId=8b232649-2bda-440c-b1c3-9757f81cf0c2',
        gmaps_link: null,
        avatar_url:
            'https://ivfblcajuujuywzdsihd.supabase.co/storage/v1/object/public/avatars/uber.png?t=2024-05-08T22%3A45%3A58.924Z',
    },
    {
        name: 'Grubhub',
        purpose: 'Food Delivery App',
        phone: '(877) 799-0790',
        email: 'restaurants@grubhub.com',
        website_url: 'https://www.grubhub.com',
        menu_url: 'https://restaurant.grubhub.com',
        support_url: 'https://get.grubhub.com/contact/',
        gmaps_link: null,
        avatar_url:
            'https://ivfblcajuujuywzdsihd.supabase.co/storage/v1/object/public/avatars/grubhub.jpg?t=2024-05-08T22%3A45%3A09.768Z',
    },
    {
        name: 'Revel',
        purpose: 'POS System',
        phone: '(415) 744-1433',
        email: null,
        website_url: 'https://revelsystems.com',
        menu_url: 'https://avaroasteria.revelup.com',
        support_url: 'https://support.revelsystems.com',
        gmaps_link: null,
        avatar_url:
            'https://ivfblcajuujuywzdsihd.supabase.co/storage/v1/object/public/avatars/revel.jpg?t=2024-05-08T22%3A45%3A36.459Z',
    },
    {
        name: 'Ben Heller',
        purpose: 'Electrician',
        phone: '(503) 317-7544',
        email: null,
        website_url: null,
        menu_url: null,
        support_url: null,
        gmaps_link: null,
        avatar_url: null,
    },
    {
        name: 'Black Rabbit',
        purpose: 'Coffee Equipment & Supplies',
        phone: '(503) 616-9426',
        email: null,
        website_url: 'https://blackrabbitservice.com',
        menu_url: null,
        support_url: null,
        gmaps_link: 'https://maps.app.goo.gl/r9BmnFfgQ4UEk1Xy5',
        avatar_url: null,
    },
    {
        name: "Oregon's Best Pest Control",
        purpose: 'Pest Control',
        phone: '(503) 348-6741',
        email: 'dana@ORbestpestcontrol.com',
        website_url:
            'https://www.angi.com/companylist/us/or/beaverton/oregon%27s-best-pest-control-and-real-estate-services-reviews-5531585.htm',
        menu_url: null,
        support_url: null,
        gmaps_link: null,
        avatar_url: null,
    },
    {
        name: 'Lucky Plumbing',
        purpose: 'Plumbing Services',
        phone: '(503) 707-0992',
        email: null,
        website_url: null,
        menu_url: null,
        support_url: null,
        gmaps_link: null,
    },
];

export default function Providers() {
    const [providers, setProviders] = useState([]); // Initial fetch data to reset filteredProviders to when search input is empty (avoids having to refetch data)
    const [filteredProviders, setFilteredProviders] = useState([]); // Data to be displayed on the page
    const [fetchError, setFetchError] = useState(null);

    useEffect(() => {
        fetchProviders();
    }, []);

    const fetchProviders = async () => {
        try {
            const { data, error } = await supabase
                .from('Providers')
                .select(
                    'name, purpose, phone_number, email, website_url, menu_url, support_url, gmaps_link, avatar_url'
                );
            if (error) {
                setProviders([]);
                setFilteredProviders([]);
                setFetchError(error);
                throw error;
                // console.log('error', error);
            }
            if (data) {
                data.sort((a, b) => a.name.localeCompare(b.name));
                setProviders(data);
                setFilteredProviders(data);
                setFetchError(null);
                // console.log('data', data);
            }
        } catch (error) {
            console.log('error: ', error);
        }
    };

    const handleSearch = (e) => {
        if (e.target.value === '') {
            setFilteredProviders(providers); // Reset filteredProviders to initial data
            return;
        }
        if (providers.length > 0) {
            let searchTerm = e.target.value.toLowerCase();
            let filteredData = providers.filter(
                (info) =>
                    info.name.toLowerCase().includes(searchTerm) ||
                    (info.purpose &&
                        info.purpose.toLowerCase().includes(searchTerm))
            );
            setFilteredProviders(filteredData);
            // console.log('filteredData', filteredData);
        }
    };

    return (
        <>
            <Sidebar />
            <HeaderBar />
            <div className={styles.pageContent}>
                <section className={styles.controls}>
                    <div className={styles.search}>
                        <IoSearchSharp />
                        <input
                            type='text'
                            placeholder='Search...'
                            className={styles.searchInput}
                            onChange={handleSearch}
                        />
                    </div>
                    <div className={styles.viewOptions}>
                        {/* <CiViewTable /> */}
                        <IoGrid />
                        <FiMenu />
                    </div>
                </section>
                <section className={styles.cardSection}>
                    {filteredProviders.length === 0 &&
                    providers.length !== 0 ? (
                        <AnimatePresence>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.7 }}
                                className={styles.noResults}
                                exit={{ opacity: 0 }}
                            >
                                <p style={{ color: 'grey' }}>No results...</p>
                            </motion.div>
                        </AnimatePresence>
                    ) : (
                        filteredProviders.map((info, index) => (
                            <AnimatePresence key={index}>
                                <motion.div
                                    initial={{ opacity: 0, y: 25 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7 }}
                                    exit={{ opacity: 0 }}
                                    // key={index}
                                >
                                    <ProvidersCard info={info} key={index} />
                                </motion.div>
                            </AnimatePresence>
                        ))
                    )}
                </section>
            </div>
        </>
    );
}
