import Image from 'next/image';
import styles from '../styles/providersCard.module.css';
import { CiGlobe } from 'react-icons/ci';
import placeholder from '/public/icons/placeholder.jpg';
import googlemaps from '/public/icons/googlemaps.png';
import support from '/public/icons/support.png';
import { MdFastfood } from 'react-icons/md';
import { MdOutlinePhone } from 'react-icons/md';
import { MdOutlineEmail } from 'react-icons/md';

export default function ProvidersCard({ info }) {
    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <div className={styles.avatar}>
                    <Image
                        src={info.avatar_url ? info.avatar_url : placeholder}
                        alt='Avatar'
                        width={60}
                        height={60}
                    />
                </div>
                <div className={styles.titleText}>
                    <h1>{info.name}</h1>
                    <p>{info.purpose}</p>
                    <div className={styles.contactLinks}>
                        {info.website_url ? (
                            <a href={info.website_url} target='_blank'>
                                <CiGlobe
                                    style={{ width: '23px', height: '23px' }}
                                />
                            </a>
                        ) : null}
                        {info.gmaps_link ? (
                            <a href={info.gmaps_link} target='_blank'>
                                <Image
                                    src={googlemaps}
                                    alt='google maps link'
                                    width={23}
                                    height={23}
                                />
                            </a>
                        ) : null}
                        {info.menu_url ? (
                            <a href={info.menu_url} target='_blank'>
                                <MdFastfood
                                    style={{ width: '23px', height: '23px' }}
                                />
                                {/* <Image
                                    src={menu}
                                    alt='menu'
                                    width={23}
                                    height={23}
                                /> */}
                            </a>
                        ) : null}
                        {info.support_url ? (
                            <a href={info.support_url} target='_blank'>
                                <Image
                                    src={support}
                                    alt='support'
                                    width={23}
                                    height={23}
                                />
                                {/* <GrHelpBook
                                    style={{ width: '23px', height: '23px' }}
                                /> */}
                            </a>
                        ) : null}
                        {/* <a href={info.website}></a> */}
                        {/* <a href={info.gmaps_link}>gmaps_link</a> */}
                    </div>
                </div>
            </div>
            <div className={styles.cardBody}>
                <div className={styles.cardBodyRow}>
                    <p className={styles.cardBodyTitle}>
                        <MdOutlinePhone />
                        Phone
                    </p>
                    <p className={styles.cardBodyInfo}>
                        {info.phone ? info.phone : '--'}
                    </p>
                </div>
                <div className={styles.cardBodyRow}>
                    <p className={styles.cardBodyTitle}>
                        <MdOutlineEmail /> Email
                    </p>
                    <p className={styles.cardBodyInfo}>
                        {info.email ? info.email : '--'}
                    </p>
                </div>
            </div>
        </div>
    );
}
