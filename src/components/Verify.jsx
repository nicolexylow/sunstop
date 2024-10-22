import { useNavigate } from 'react-router-dom'
import styles from '../scss/modules/Verify.module.scss';
import '../scss/global.scss';
import backIcon from '../assets/back_icon.png';
import cancelIcon from '../assets/cancel_icon.png';
import PageTemplate from './PageTemplate';

function Verify() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/confirm_verify');
    }

    const handleBack = () => {
        navigate('/sign_up');
    }

    const handleCancel = () => {
        navigate('/')
    }

    return (
        <>
        <PageTemplate>
            <div className="main-container">
                <div className="button-nav-container">
                    <button className='back-cancel-button' onClick={handleBack}>
                        <img className='back-cancel-button-icon' src={backIcon} alt="Back Icon" /> Back
                    </button>
                    <button className='back-cancel-button' onClick={handleCancel}>
                        <img className='back-cancel-button-icon' src={cancelIcon} alt="Cancel Icon" /> Cancel
                    </button>
                </div>

                <div className='center-container'>
                    <div className={styles['content-container']}>
                        <h1 className={styles['heading']}>Verify that it's you</h1>
                        <p className={styles['text']}>Please confirm your phone number following the verification link we sent to 0410 567 789.</p>
                        <div className={styles['button-container']}>
                            <button onClick={handleClick} className='next-button'>Resend Link</button>
                        </div>
                    </div>
                </div>
            </div>
        </PageTemplate>
        </>
    );
}

export default Verify