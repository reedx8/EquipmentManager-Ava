// Client side modal
'use client';
import React from 'react';
import styles from '../equipment/equipment.module.css';

// Swaps equipment between store locations and storage units
export default function SwapModal(props) {
    return (
        <div className={styles.modal}>
            <div className={styles.modalBackground}>
                <div>
                    <h1>Swap Equipment</h1>
                </div>
                {/* TODO: Add form validation, and generate content from DB instead */}
                <form className={styles.modalContents}>
                    <div>
                        <label for='from'>From: </label>
                        <select id='from' name='from'>
                            <option value='hall'>Hall</option>
                            <option value='barrows'>Barrows</option>
                            <option value='orenco'>Orenco</option>
                            <option value='kruse'>Kruse</option>
                        </select>
                    </div>
                    <div>
                        <label for='to'>To: </label>
                        <select id='to' name='to'>
                            <option value='hall'>Hall</option>
                            <option value='barrows'>Barrows</option>
                            <option value='orenco'>Orenco</option>
                            <option value='kruse'>Kruse</option>
                        </select>
                    </div>
                    <div>
                        <label>Name</label>
                        <input type='text' name='equipmentName' />
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
                            Swap
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
