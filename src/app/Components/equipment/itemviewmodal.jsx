import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '@/app/styles/equipment/itemviewmodal.module.css';
import { MdOutlineClose } from 'react-icons/md';
import { MdOutlineMailOutline } from 'react-icons/md';
import { MdOutlinePhone } from 'react-icons/md';
import getStatus from '@/app/utils/getStatuses';
import supabase from '@/app/config/supabaseClient';
import { IoMdPerson } from 'react-icons/io';

/**
 * Renders a modal that displays the details of an item
 * @param {Object} props - Object containing item details and close modal function
 * @param {Object} props.itemDetails - Object containing details of the item to be displayed
 * @param {Function} props.closeModal - Callback function to close the modal
 * @returns {JSX.Element} -- ItemViewModal component
 */
export default function ItemViewModal({ itemDetails, closeModal }) {
    const [item, setItem] = useState({
        name: '',
        comments: '',
        store: '',
        type: '',
        status: '',
        provider: '',
        image: itemDetails.Image,
    });
    const [providerInfo, setProviderInfo] = useState({
        phone: '',
        email: '',
        avatar: '',
    });

    useEffect(() => {
        setItem({
            name: itemDetails.Name,
            comments: itemDetails.Comments,
            store: itemDetails.Store_Name,
            type: itemDetails.Equip_Type,
            provider: itemDetails.Provider_Name,
            status: getStatus(itemDetails.Status_id),
            image: itemDetails.Image,
        });
        async function fetchProviderInfo() {
            const { data, error } = await supabase
                .from('Providers')
                .select('phone_number, email, avatar_url')
                .eq('name', itemDetails.Provider_Name);
            if (error) {
                console.log('error', error);
                return;
            }
            setProviderInfo({
                phone: data[0].phone_number,
                email: data[0].email,
                avatar: data[0].avatar_url,
            });
        }
        fetchProviderInfo();
        console.log('itemviewmodal useeffect ran');
    }, [itemDetails]);

    function closeItemViewModal() {
        closeModal('view');
    }

    return (
        <div className={styles.modal}>
            <div className={styles.modalBackground}>
                <div className={styles.modalTopBar}>
                    <h2 className={styles.title}>{item.name}</h2>
                    <button
                        className={styles.close}
                        onClick={closeItemViewModal}
                    >
                        <MdOutlineClose />
                    </button>
                </div>
                <div className={styles.modalContents}>
                    <div>
                        <Image
                            src={item.image ? item.image : '/placeholder.jpg'}
                            alt='equipment'
                            width={'300'}
                            height={'300'}
                            style={{ borderRadius: '5px' }}
                        />
                        {/* <p className={styles.textTitle}>Status</p> */}
                        <p>
                            <span className={styles.textTitle}>Status: </span>
                            {item.status}
                        </p>
                    </div>
                    <div className={styles.contents}>
                        <div className={styles.contentsTitle}>
                            <div>
                                <p className={styles.textTitle}>
                                    Store Location
                                </p>
                                <p className={styles.storeTitle}>
                                    {item.store.toUpperCase()}
                                </p>
                            </div>
                            <div className={styles.itemType}>
                                <p className={styles.textTitle}>Device Type</p>
                                <p>{item.type ? item.type : '--'}</p>
                            </div>
                        </div>
                        <div>
                            <p className={styles.textTitle}>Provider</p>
                            <div className={styles.providerRow}>
                                {providerInfo.avatar ? (
                                    <Image
                                        src={providerInfo.avatar}
                                        width={20}
                                        height={20}
                                        alt='provider avatar'
                                    />
                                ) : (
                                    <IoMdPerson />
                                )}
                                <p>{item.provider}</p>
                            </div>
                            <div className={styles.providerDetails}>
                                {providerInfo.phone && (
                                    <div>
                                        <MdOutlinePhone size={15} />
                                        <p>{providerInfo.phone}</p>
                                    </div>
                                )}
                                {providerInfo.email && (
                                    <div>
                                        <MdOutlineMailOutline size={15} />
                                        <p>{providerInfo.email}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className={styles.repairMaintRow}>
                            <div>
                                <p>Next Repair</p>
                                <p>1/1/99</p>
                            </div>
                            <div>
                                <p># of Repairs</p>
                                <p>0</p>
                            </div>
                            <div>
                                <p>Next Maint.</p>
                                <p>1/1/99</p>
                            </div>
                            <div>
                                <p># of Maint.</p>
                                <p>0</p>
                            </div>
                        </div>
                        <div className={styles.repairMaintRow}>
                            <div>
                                <p>Total Repair Cost</p>
                                <p>$0.00</p>
                            </div>
                            <div>
                                <p>Total Maint. Cost</p>
                                <p>$0.00</p>
                            </div>
                        </div>
                        <div className={styles.commentsRow}>
                            <p className={styles.textTitle}>Comments</p>
                            <p className={styles.commentsBox}>
                                {item.comments}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
