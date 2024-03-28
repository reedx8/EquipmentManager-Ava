// Client side modal
'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import styles from '../equipment/equipment.module.css';

// Adds equipment to the 'equipment' table in database
export default function AddEquipmentModal(props) {
    return (
        <div className={styles.modal}>
            <div className={styles.modalBackground}>
                <div>
                    <h1>Add Equipment</h1>
                </div>
                {/* TODO: Add form validation, and generate content from DB instead */}
                <form className={styles.modalContents}>
                    <div>
                        <label>Name</label>
                        <input type='text' name='equipmentName' />
                    </div>
                    <div>
                        <label for='equipmentType'>Type</label>
                        <select id='equipmentType' name='equipmentType'>
                            <option value='tablet'>Tablet</option>
                            <option value='computer'>Computer</option>
                            <option value='printer'>Printer</option>
                            <option value='modem'>Modem</option>
                            <option value='oven'>Oven</option>
                            <option value='refrigerator'>Refrigerator</option>
                            <option value='espresso'>Espresso Machine</option>
                            <option value='microwave'>Microwave</option>
                        </select>
                    </div>
                    <div>
                        <label for='storeLocation'>Store Location</label>
                        <select id='storeLocation' name='storeLocation'>
                            <option value='hall'>Hall</option>
                            <option value='barrows'>Barrows</option>
                            <option value='orenco'>Orenco</option>
                            <option value='kruse'>Kruse</option>
                        </select>
                    </div>
                    <div>
                        <label for='provider'>Provider</label>
                        <select id='provider' name='provider'>
                            <option value='ava'>Ava Roasteria</option>
                            <option value='grubhub'>Grubhub</option>
                            <option value='doordash'>DoorDash</option>
                            <option value='ubereats'>Uber Eats</option>
                            <option value='comcast'>Comcast</option>
                            <option value='revel'>Revel</option>
                        </select>
                    </div>
                    <div className={styles.buttonsRow}>
                        <button
                            className={styles.modalButtons}
                            onClick={() => props.closeModal()}
                            type='button'
                        >
                            Close
                        </button>
                        <button
                            className={styles.modalButtons}
                            onClick={() => props.closeModal()}
                            type='button'
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
