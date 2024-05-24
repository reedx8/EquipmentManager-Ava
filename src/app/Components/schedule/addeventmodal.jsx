import { useState, useEffect } from 'react';
import styles from '@/app/styles/schedule/addeventmodal.module.css';
import supabase from '@/app/config/supabaseClient';
import { fetchEventTypes } from '@/app/utils/fetchData';

export default function AddEventModal({ showModal, refreshPage }) {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [comments, setComments] = useState('');
    const [time, setTime] = useState('');
    const [eventTypes, setEventTypes] = useState([]);
    const [selectedType, setSelectedType] = useState(3); // 3 = General

    useEffect(() => {
        const loadData = async () => {
            try {
                const eventTypes = await fetchEventTypes();
                setEventTypes(eventTypes);
            } catch (error) {
                console.error('Error fetching event types: ', error);
            }
        };
        loadData();
    }, []);

    const createEvent = async (event) => {
        event.preventDefault();

        const newDate = parseDate(date, time);

        if (
            !title ||
            title.trim().length === 0 ||
            !newDate ||
            newDate === '' ||
            newDate === 'Invalid Date' ||
            newDate === 'NaN-NaN-NaN'
        ) {
            alert('Title and/or date are required');
            return;
        } else if (title.length > 30) {
            alert('Title must be 30 characters or less');
            return;
        } else if (comments.length > 500) {
            alert('Comments must be 500 characters or less');
            return;
        } else if (comments.trim().length === 0) {
            setComments(null);
        }

        const { data, error } = await supabase.from('Events').insert([
            {
                title: title,
                date: newDate,
                comments: comments,
                type_id: selectedType,
            },
        ]);

        if (error) {
            alert('Error creating event: ' + error.message);
        } else {
            showModal(false);
            refreshPage();
        }
    };

    // Creates a Date as it appeared to the user in the form
    const parseDate = (date, time) => {
        const [year, month, day] = date.split('-');
        const [hour, minute] = time.split(':');
        return new Date(year, month - 1, day, hour, minute);
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalBackground}>
                <h2>Add Event</h2>
                <form className={styles.modalContents} onSubmit={createEvent}>
                    {eventTypes.length > 0 && (
                        <select
                            name='eventType'
                            id='eventType'
                            required
                            className={styles.eventTypeSelect}
                            onChange={(e) => {
                                setSelectedType(e.target.value);
                                // console.log(e.target.value);
                            }}
                        >
                            <option value=''>Select Event Type</option>
                            {eventTypes.map((eventType) => (
                                <option key={eventType.id} value={eventType.id}>
                                    {eventType.name}
                                </option>
                            ))}
                        </select>
                    )}
                    <input
                        type='text'
                        name='title'
                        id='title'
                        placeholder='Title'
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <input
                        type='date'
                        name='date'
                        id='date'
                        onChange={(e) => setDate(e.target.value)}
                        min='2024-01-01'
                        max='2100-12-31'
                        className={styles.dateInput}
                        pattern='\d{4}-\d{2}-\d{2}'
                        required
                    />
                    <input
                        type='time'
                        name='time'
                        id='time'
                        onChange={(e) => setTime(e.target.value)}
                        required
                    />
                    <textarea
                        name='comments'
                        id='comments'
                        placeholder='Comments (optional)'
                        onChange={(e) => setComments(e.target.value)}
                        rows={5}
                        style={{ resize: 'none' }}
                    ></textarea>
                    <div className={styles.buttonsRow}>
                        <button
                            type='button'
                            onClick={() => showModal(false)}
                            className={styles.modalButtons}
                        >
                            Cancel
                        </button>
                        <button type='submit' className={styles.modalButtons}>
                            Add Event
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
