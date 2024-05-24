import styles from '@/app/styles/schedule/vieweventmodal.module.css';

export default function ViewEventModal({ showModal, event }) {
    return (
        <div className={styles.modal}>
            <div className={styles.modalBackground}>
                <h2>{event.title}</h2>
                <div className={styles.modalContents}>
                    <p>{new Date(event.start).toLocaleDateString()}</p>
                    <p>{new Date(event.start).toLocaleTimeString()}</p>
                    <p>{event.comments}</p>
                    <div className={styles.buttonsRow}>
                        <button
                            className={styles.modalButtons}
                            onClick={() => showModal(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
