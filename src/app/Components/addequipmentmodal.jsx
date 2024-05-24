// Client side modal
'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import styles from '../equipment/equipment.module.css';
import supabase from '../config/supabaseClient';
import {
    fetchStores,
    fetchStatuses,
    fetchEquipTypes,
    fetchProviders,
} from '../utils/fetchData';

// export const revalidate = 86400;

// Adds equipment to the 'Equipment' table in database
export default function AddEquipmentModal(props) {
    // Default values for form fields:
    const [equipmentName, setEquipmentName] = useState('');
    const [equipmentType, setEquipmentType] = useState('Tablet'); // First option in select
    const [storeLocation, setStoreLocation] = useState('Hall');
    const [provider, setProvider] = useState('Ava Roasteria');
    const [status, setStatus] = useState(1);
    // Options fetched from database:
    const [statuses, setStatuses] = useState([]);
    const [stores, setStores] = useState([]);
    const [equipTypes, setEquipTypes] = useState([]);
    const [providers, setProviders] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const stores = await fetchStores();
                setStores(stores);
                const statuses = await fetchStatuses();
                setStatuses(statuses);
                const equipTypes = await fetchEquipTypes();
                setEquipTypes(equipTypes);
                const providers = await fetchProviders();
                setProviders(providers);
            } catch (error) {
                setError(error);
            }
        };
        loadData();

        /*
        const fetchStatuses = async () => {
            try {
                const response = await fetch('/api/statuses');
                if (!response.ok) {
                    throw new Error('Failed to fetch statuses');
                }
                const data = await response.json();
                setStatuses(data);
                // console.log('Statuses: ', data);
            } catch (error) {
                setStatusesError(error);
            }
        };
        const fetchStores = async () => {
            try {
                const response = await fetch('/api/stores');
                if (!response.ok) {
                    throw new Error('Failed to fetch stores');
                }
                const data = await response.json();
                setStores(data);
            } catch (error) {
                setStoresError(error);
            }
        };

        fetchStatuses();
        fetchStores();
        */
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

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
                            {equipTypes.map((equipType, index) => (
                                <option key={index} value={equipType.Name}>
                                    {equipType.Name}
                                </option>
                            ))}
                            {/* <option value='Tablet'>Tablet</option>
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
                            <option value='Microwave'>Microwave</option> */}
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
                            {stores.map((store, index) => (
                                <option key={index} value={store.Name}>
                                    {store.Name}
                                </option>
                            ))}
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
                            {statuses.map((status) => (
                                <option key={status.id} value={status.id}>
                                    {status.Status}
                                </option>
                            ))}
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
                            {providers.map((provider, index) => (
                                <option key={index} value={provider.name}>
                                    {provider.name}
                                </option>
                            ))}
                            {/* <option value='Ava Roasteria'>Ava Roasteria</option>
                            <option value='Grubhub'>Grubhub</option>
                            <option value='Doordash'>DoorDash</option>
                            <option value='Uber Eats'>Uber Eats</option>
                            <option value='Comcast'>Comcast</option>
                            <option value='Revel'>Revel</option> */}
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
