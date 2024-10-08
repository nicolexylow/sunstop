import { useNavigate } from 'react-router-dom'

import styles from '../scss/modules/Verify.module.scss';

function Verify() {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/confirm_verify')
    }

    return (
        <>
        <button className={styles['back-button']}>Back</button>
        <div className={styles['center-container']}>
            <div className={styles['content-container']}>
                <p>Verify that it's you</p>
                <p>Please confirm your phone number following the verification link we sent to 0410 567 789.</p>
                <div className={styles['button-container']}>
                    <button className={styles['button']}>Change details</button>
                    <button onClick={handleClick} className={styles['button']}>Resend Link</button>
                </div>
            </div>
        </div>
        </>
    );
}

export default Verify