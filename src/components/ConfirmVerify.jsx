import { useNavigate } from 'react-router-dom';
import styles from '../scss/modules/ConfirmVerify.module.scss';

function ConfirmVerify() {
    const navigate = useNavigate();
    const handleSubmit = () => {
        navigate('/dispense');
    }
    return (
        <>
        <div className={styles['center-container']}>
            <div className={styles['content-container']}>
                <div className={styles['heading-container']}>
                    <span className={`material-symbols-rounded ${styles['complete-icon']}`}>task_alt</span>
                    <h1>Verification Complete!</h1>
                </div>
                <form onSubmit={handleSubmit} className={styles['form']}>
                    <label>Welcome! What is your name?</label><br />
                    <input type="text" /><br />
                    <input type="submit" value="Submit" className={styles['submit-button']} />
                </form>
            </div>
        </div>
        </>
    );
}

export default ConfirmVerify