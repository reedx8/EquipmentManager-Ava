'use client';
// import React from 'react';
import { useState, useEffect } from 'react';
import styles from '@/app/equipment/equipment.module.css';
// import styles from '../equipment/equipment.module.css';
import supabase from '@/app/config/supabaseClient';
// import supabase from '../config/supabaseClient';

export default function DeleteEquipmentModal({
    closeModal,
    itemDetails,
    refreshEquipment,
}) {
    const [equipmentId, setEquipmentId] = useState(itemDetails.id);
    const [equipmentName, setEquipmentName] = useState(itemDetails.Name);

    async function handleDelete(event) {
        event.preventDefault();
        console.log('Deleting...');
        try {
            const { data, error } = await supabase
                .from('Equipment')
                .delete()
                .eq('id', equipmentId);

            if (error) {
                throw error;
            }
        } catch (error) {
            alert('Error deleting equipment: ' + error.message);
        }

        closeModal('delete');
        refreshEquipment();
    }

    return (
        <div className={styles.modal}>
            <div className={styles.modalBackground}>
                <div>
                    <h1>Delete Equipment</h1>
                </div>
                <div className={styles.modalContents}>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <p
                            style={{
                                backgroundColor: 'lightgrey',
                                padding: '0.5rem',
                                marginBottom: '0.5rem',
                                // color: 'white',
                            }}
                        >
                            {equipmentName}
                        </p>
                        <p>Are you sure you want delete?</p>
                    </div>
                    <div className={styles.buttonsRow}>
                        <button
                            onClick={() => closeModal('delete')}
                            className={styles.modalButtons}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            className={styles.modalButtons}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
