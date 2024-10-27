import styles from '../scss/modules/SignUp.module.scss';
import backIcon from '../assets/back_icon.png';
import cancelIcon from '../assets/cancel_icon.png';
import '../scss/global.scss'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import PageTemplate from './PageTemplate';

function SignUp() {
    const navigate = useNavigate();

    // LOCAL STORAGE
    const [inputContact, setInputContact] = useState('');
    const [signUpList, setSignUpList] = useState(() => {
        const savedList = localStorage.getItem('signUpList');
        return savedList ? JSON.parse(savedList) : [];
    });


    useEffect(() => {
        localStorage.setItem('signUpList', JSON.stringify(signUpList));
    }, [signUpList]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Inject dev login 
        const newSignUpList = [...signUpList, {contact: inputContact, name: '', points: 0}];
        setSignUpList(newSignUpList);
        localStorage.setItem('signUpList', JSON.stringify(newSignUpList));
        setInputContact('');
        navigate('/verify');
    }

    const handleBack = () => {
        navigate('/');
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
                        <form className={styles['form']} onSubmit={handleSubmit}>
                            <label for="details" className={styles['label']}>Free Sunscreen and Rewards</label>
                            <br />
                            <input 
                                type="text" 
                                placeholder='Email or Phone' 
                                className='input-field'
                                value={inputContact}
                                onChange={(e) => setInputContact(e.target.value)} 
                                required
                            />
                            <br />
                            <div className={styles['submit-button-container']}>
                                <input className='next-button' type="submit" value="Continue" />
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