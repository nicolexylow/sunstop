import styles from '../scss/modules/SignUp.module.scss';
import '../scss/global.scss'
import { useNavigate } from 'react-router-dom'

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
        <div className="main-container">
            <button className={styles['back-button']} onClick={handleBack}>Back</button>
            <div className={styles['center-container']}>
                <div className={styles['content-container']}>
                    <h1 className={styles['heading']}>Sign Up</h1>
                    <form onSubmit={handleSubmit}>
                        <label for="details">Enter details:</label><br />
                        <input type="text" placeholder='Email or Phone' className={styles['input-field']}/><br />
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </div>
        </>
    );
}

export default SignUp