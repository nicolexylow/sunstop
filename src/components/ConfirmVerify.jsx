import { useNavigate } from 'react-router-dom';
import styles from '../scss/modules/ConfirmVerify.module.scss';
import '../scss/global.scss';
import PageTemplate from './PageTemplate';
import backIcon from '../assets/back_icon.png';
import cancelIcon from '../assets/cancel_icon.png';

function ConfirmVerify() {
    const navigate = useNavigate();
    const handleSubmit = () => {
        navigate('/dispense');
    }
    const handleBack = () => {
        navigate('/verify')
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
                        <h1 className={styles['heading']}>Verification Complete</h1>
                       
                        <form onSubmit={handleSubmit} className={styles['form']}>
                            <label className={styles['label']}>Welcome to SunStop! What's is your name?</label><br />
                            <input type="text" className='input-field' />
                            <br />
                            <div className={styles['submit-button-container']}>
                                <input type="submit" value="Submit" className='next-button' />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </PageTemplate>
        </>
    );
}

export default ConfirmVerify