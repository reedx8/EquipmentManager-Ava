// Client side modal
'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import styles from '../equipment/equipment.module.css';
import supabase from '../config/supabaseClient';

// Adds equipment to the 'equipment' table in database
export default function AddEquipmentModal(props) {
    const [equipmentName, setEquipmentName] = useState('');
    const [equipmentType, setEquipmentType] = useState('Tablet'); // First option in select
    const [storeLocation, setStoreLocation] = useState('Hall');
    const [provider, setProvider] = useState('Ava Roasteria');
    const [status, setStatus] = useState('On Floor');

    const handleSubmit = async (event) => {
        event.preventDefault();

        /*
        alert(
            `Name: ${equipmentName}, Type: ${equipmentType}, Location: ${storeLocation}, Provider: ${provider}`
        );
        */

        const { data, error } = await supabase.from('Equipment').insert([
            {
                Name: equipmentName,
                Equip_Type: equipmentType,
                Store_Name: storeLocation,
                Status_id: status,
                Provider_Name: provider,
            },
        ]);

        if (error) {
            alert('Error adding equipment: ' + error.message);
        } else {
            props.closeModal('add');
            props.refreshEquipment();
        }
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalBackground}>
                <div>
                    <h1>Add Equipment</h1>
                </div>
                {/* TODO: Add form validation, and generate content from DB instead */}
                <form className={styles.modalContents} onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='equipmentName'>Name</label>
                        <input
                            id='equipmentName'
                            type='text'
                            name='equipmentName'
                            value={equipmentName}
                            onChange={(e) => setEquipmentName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='equipmentType'>Type</label>
                        <select
                            id='equipmentType'
                            name='equipmentType'
                            value={equipmentType}
                            onChange={(e) => setEquipmentType(e.target.value)}
                        >
                            <option value='Tablet'>Tablet</option>
                            <option value='Computer'>Computer</option>
                            <option value='Printer'>Printer</option>
                            <option value='Network Device'>
                                Network Device
                            </option>
                            <option value='Oven'>Oven</option>
                            <option value='Refrigerator'>Refrigerator</option>
                            <option value='Espresso Machine'>
                                Espresso Machine
                            </option>
                            <option value='Microwave'>Microwave</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor='storeLocation'>Store Location</label>
                        <select
                            id='storeLocation'
                            name='storeLocation'
                            value={storeLocation}
                            onChange={(e) => setStoreLocation(e.target.value)}
                        >
                            <option value='Hall'>Hall</option>
                            <option value='Barrows'>Barrows</option>
                            <option value='Orenco'>Orenco</option>
                            <option value='Kruse'>Kruse</option>
                            <option value='Bakery'>Bakery</option>
                            <option value='Office'>Office</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor='status'>Status</label>
                        <select
                            id='status'
                            name='status'
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value={1}>On Floor</option>
                            <option value={2}>In Storage</option>
                            {/* // create options for following: Under Maintenance, Being Repaired, Decommissioned, For Sale, Lost, Stolen, Needs Repair, Awaiting Reassignment */}
                            <option value={3}>Under Maintenance</option>
                            <option value={4}>Being Repaired</option>
                            <option value={5}>Decommissioned</option>
                            <option value={6}>For Sale</option>
                            <option value={7}>Lost</option>
                            <option value={8}>Stolen</option>
                            <option value={9}>Needs Repair</option>
                            <option value={10}>Awaiting Reassignment</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor='provider'>Provider</label>
                        <select
                            id='provider'
                            name='provider'
                            value={provider}
                            onChange={(e) => setProvider(e.target.value)}
                        >
                            <option value='Ava Roasteria'>Ava Roasteria</option>
                            <option value='Grubhub'>Grubhub</option>
                            <option value='Doordash'>DoorDash</option>
                            <option value='Uber Eats'>Uber Eats</option>
                            <option value='Comcast'>Comcast</option>
                            <option value='Revel'>Revel</option>
                        </select>
                    </div>
                    <div className={styles.buttonsRow}>
                        <button
                            className={styles.modalButtons}
                            onClick={() => props.closeModal('add')}
                            type='button'
                        >
                            Close
                        </button>
                        <button className={styles.modalButtons} type='submit'>
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
