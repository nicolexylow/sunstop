import styles from '../scss/modules/SignUp.module.scss';
import '../scss/global.scss'
import { useNavigate } from 'react-router-dom'
import PageTemplate from './PageTemplate';

function SignUp() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/verify');
    }

    const handleBack = () => {
        navigate('/');
    }

    return (
        <>
        <PageTemplate>
            <div className="main-container">
                <div className="button-nav-container">
                    <button className={styles['back-button']} onClick={handleBack}>Back</button>
                    <button>Cancel</button>
                </div>
                
                <div className={styles['center-container']}>
                    <div className={styles['content-container']}>
                        <form className={styles['form']} onSubmit={handleSubmit}>
                            <label for="details" className={styles['label']}>Free Sunscreen and Rewards</label>
                            <br />
                            <input type="text" placeholder='Email or Phone' className={styles['input-field']}/><br />

                            <div className={styles['submit-button-container']}>
                                <input type="submit" value="Continue" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </PageTemplate>
        </>
    );
}

export default SignUp