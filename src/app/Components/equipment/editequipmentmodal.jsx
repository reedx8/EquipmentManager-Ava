'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import styles from '@/app/equipment/equipment.module.css';
import supabase from '@/app/config/supabaseClient';
import {
    fetchProviders,
    fetchStatuses,
    fetchEquipTypes,
    fetchStores,
} from '@/app/utils/fetchData';
import { set } from 'date-fns';

/**
 * Component to edit equipment details
 * @param {Object} props - Object containing the following properties:
 * @param {Function} props.closeModal - Callback function to close the modal
 * @param {Object} props.itemDetails - Object containing the details of the equipment item
 * @param {Function} props.refreshEquipment - Callback function to refresh the equipment list once done
 * @returns {JSX.Element} - JSX Element containing the modal to edit equipment details
 */
export default function EditEquipmentModal({
    closeModal,
    itemDetails,
    refreshEquipment,
}) {
    const [equipmentId, setEquipmentId] = useState(itemDetails.id);
    const [equipmentName, setEquipmentName] = useState(itemDetails.Name);
    const [equipmentType, setEquipmentType] = useState(itemDetails.Equip_Type);
    const [storeLocation, setStoreLocation] = useState(itemDetails.Store_Name);
    const [provider, setProvider] = useState(itemDetails.Provider_Name);
    const [comments, setComments] = useState(itemDetails.Comments);
    // const [purchaseDate, setPurchaseDate] = useState(itemDetails.Purchase_Date);
    // const [reason, setReason] = useState(itemDetails.Reason);
    // const [totalCost, setTotalCost] = useState(itemDetails.Total_Cost);
    const [status, setStatus] = useState(itemDetails.Status_id);
    const [providerList, setProviderList] = useState([]);
    const [statusList, setStatusList] = useState([]);
    const [equipTypeList, setEquipTypeList] = useState([]);
    const [storeList, setStoreList] = useState([]);

    // console.log('itemDetails: ' + equipmentName);

    useEffect(() => {
        setEquipmentId(itemDetails.id);
        setEquipmentName(itemDetails.Name);
        setEquipmentType(itemDetails.Equip_Type);
        setStoreLocation(itemDetails.Store_Name);
        setProvider(itemDetails.Provider_Name);
        setComments(itemDetails.Comments);
        // setPurchaseDate(itemDetails.Purchase_Date);
        // setTotalCost(itemDetails.Total_Cost);
        setStatus(itemDetails.Status_id);

        async function fetchAllLists() {
            try {
                const providers = await fetchProviders();
                setProviderList(providers);
                const statuses = await fetchStatuses();
                setStatusList(statuses);
                const equipTypes = await fetchEquipTypes();
                setEquipTypeList(equipTypes);
                const stores = await fetchStores();
                setStoreList(stores);
            } catch (error) {
                console.error('Error fetching: ' + error);
            }
        }

        fetchAllLists();
    }, [itemDetails]);

    async function handleSubmit(event) {
        event.preventDefault();

        const { data, error } = await supabase
            .from('Equipment')
            .update({
                Name: equipmentName,
                Equip_Type: equipmentType,
                Store_Name: storeLocation,
                Provider_Name: provider,
                Comments: comments,
                // Purchase_Date: purchaseDate,
                // Reason: reason,
                // Total_Cost: totalCost,
                Status_id: status,
            })
            .match({ id: equipmentId });

        if (error) {
            console.error('Error updating equipment: ' + error);
            alert('Error updating equipment: ' + error.message);
        } else {
            closeModal('edit');
            refreshEquipment();
        }
    }

    return (
        <div className={styles.modal}>
            <div className={styles.modalBackground}>
                <div>
                    <h1>Edit Equipment</h1>
                </div>
                {/* Form and inputs to edit the equipment details, using itemDetails */}
                {/* TODO: Add form validation, and generate content from DB instead */}
                {/* <form className={styles.modalContents}> */}
                <form className={styles.modalContents} onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor='equipmentName'
                            className={styles.rowName}
                        >
                            Name
                        </label>
                        <input
                            id='equipmentName'
                            type='text'
                            name='equipmentName'
                            value={equipmentName || ''}
                            onChange={(e) => setEquipmentName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor='equipmentType'
                            className={styles.rowName}
                        >
                            Type
                        </label>
                        <select
                            id='equipmentType'
                            name='equipmentType'
                            value={equipmentType || ''}
                            onChange={(e) => setEquipmentType(e.target.value)}
                        >
                            {equipTypeList.map((equipType, index) => (
                                <option key={index} value={equipType.Name}>
                                    {equipType.Name}
                                </option>
                            ))}
                            {/* <option value='Appliance'>Appliance</option>
                            <option value='Computer'>Computer</option>
                            <option value='Grinder'>Grinder</option>
                            <option value='Misc.'>Misc.</option>
                            <option value='Network Device'>
                                Network Device
                            </option>
                            <option value='Printer'>Printer</option>
                            <option value='Refrigerator'>Refrigerator</option>
                            <option value='Tablet'>Tablet</option> */}
                        </select>
                    </div>
                    <div>
                        <label
                            htmlFor='storeLocation'
                            className={styles.rowName}
                        >
                            Store Location
                        </label>
                        <select
                            id='storeLocation'
                            name='storeLocation'
                            value={storeLocation || ''}
                            onChange={(e) => setStoreLocation(e.target.value)}
                        >
                            {storeList.map((store, index) => (
                                <option key={index} value={store.Name}>
                                    {store.Name}
                                </option>
                            ))}
                            {/* <option value='Hall'>Hall</option>
                            <option value='Barrows'>Barrows</option>
                            <option value='Kruse'>Kruse</option>
                            <option value='Orenco'>Orenco</option>
                            <option value='Bakery'>Bakery</option>
                            <option value='Office'>Office</option>
                            <option value='Warehouse'>Warehouse</option> */}
                        </select>
                    </div>
                    <div>
                        <label htmlFor='provider' className={styles.rowName}>
                            Provider
                        </label>
                        <select
                            id='provider'
                            name='provider'
                            value={provider || ''}
                            onChange={(e) => setProvider(e.target.value)}
                        >
                            {providerList.map((provider, index) => (
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
                    <div>
                        <label htmlFor='status' className={styles.rowName}>
                            Status
                        </label>
                        <select
                            id='status'
                            name='status'
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            {statusList.map((status, index) => (
                                <option key={index} value={status.id}>
                                    {status.Status}
                                </option>
                            ))}
                            {/* <option value={1}>On Floor</option>
                            <option value={3}>Under Maintenance</option>
                            <option value={4}>Being Repaired</option>
                            <option value={5}>Decommissioned</option>
                            <option value={6}>For Sale</option>
                            <option value={7}>Lost</option>
                            <option value={8}>Stolen</option>
                            <option value={9}>Needs Repair</option>
                            <option value={10}>Awaiting Reassignment</option>
                            <option value={14}>Repair Scheduled</option> */}
                        </select>
                    </div>
                    {/* <div>
                        <label
                            htmlFor='purchaseDate'
                            className={styles.rowName}
                        >
                            Purchase Date
                        </label>
                        <input
                            id='purchaseDate'
                            type='date'
                            name='purchaseDate'
                            value={purchaseDate || ''}
                            onChange={(e) => setPurchaseDate(e.target.value)}
                        />
                    </div> */}
                    {/* <div>
                        <label htmlFor='totalCost' className={styles.rowName}>
                            Total Cost: $
                        </label>
                        <input
                            id='totalCost'
                            type='text'
                            name='totalCost'
                            value={totalCost || ''}
                            onChange={(e) => setTotalCost(e.target.value)}
                        />
                    </div> */}
                    {/* <div>
                        <label
                            htmlFor='numOfRepairs'
                            className={styles.rowName}
                        >
                            Number of Repairs:{' '}
                        </label>
                        <p>{numOfRepairs || ''}</p>
                    </div> */}
                    <div>
                        <label htmlFor='comments'>Comments</label>
                        <div>
                            <textarea
                                id='comments'
                                // type='text'
                                name='comments'
                                rows='5'
                                cols='40'
                                value={comments || ''}
                                onChange={(e) => setComments(e.target.value)}
                            />
                            {/* {itemDetails.Comments} */}
                            {/* </textarea> */}
                        </div>
                    </div>
                    <div className={styles.buttonsRow}>
                        <button
                            className={styles.modalButtons}
                            onClick={() => closeModal('edit')}
                            type='button'
                        >
                            Close
                        </button>
                        <button className={styles.modalButtons} type='submit'>
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
