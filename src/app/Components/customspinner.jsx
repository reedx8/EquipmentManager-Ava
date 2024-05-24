import { PropagateLoader as MySpinner } from 'react-spinners';
import styles from '../equipment/equipment.module.css';

const customSpinnerCSS = {
    zIndex: 10000,
    // position: 'fixed',
    // top: '50%',
    // left: '50%',
    // transform: 'translate(-50%, -50%)',
};

export default function CustomSpinner() {
    return (
        <div className={styles.modal}>
            <MySpinner
                cssOverride={customSpinnerCSS}
                color={'white'}
                loading={true}
                size={10}
                aria-label='Loading...'
            />
        </div>
    );
}
