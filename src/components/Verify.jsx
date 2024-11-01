import { useNavigate, useLocation } from 'react-router-dom'
import styles from '../scss/modules/Verify.module.scss';
import '../scss/global.scss';
import backIcon from '../assets/back_icon.png';
import cancelIcon from '../assets/cancel_icon.png';
import PageTemplate from './PageTemplate';
import { useState, useEffect } from 'react';
import store from 'store2'

import { sign } from 'chart.js/helpers';

function initVerifyEmail() {
    // Hoo boy submit email time
    const handleClick = async (e) => {
        e.preventDefault();
        console.log(`${to} ${subject} ${message}`)
        try {
            await axios.post("/api/send", {
                from: "Sunstop Verify sunstopverify@gmail.com",  
                to,
                subject,
                message
            });
            alert("Email sent!");
        } catch(err) {
            alert(err);
        }
    };

    return (
        <>
            <button onClick={handleClick} className='next-button'>Resend Link</button>
        </>
    )
}
function initVerifyPhone() {

}

function Verify() {
    const navigate = useNavigate();
    const location = useLocation();
    // Grabs two variables from last page:
    // verifDetails.inputContact contains phone number or email string (from user)
    // verifDetails.method contains 'phone' or 'email' string
    const verifDetails = location.state;
    console.log(verifDetails)

    // LOCAL STORAGE
    const [verifContact, setVerifContact] = useState('');
    const [signUpList, setSignUpList] = useState( () => {
        return store.get('signUpList');
    });
    console.log(signUpList)

    const handleClick = () => {
        localStorage.setItem('signUpList', JSON.stringify(signUpList));
        const devSignUp = [...signUpList, {contact: 'developer', name: 'Chris', points: 400}];
        localStorage.setItem('signUpList', JSON.stringify(devSignUp));
        console.log('dev added...')
        console.log(JSON.parse(localStorage.getItem('signUpList')))
        navigate('/confirm_verify');
    }

    const handleBack = () => {
        navigate('/sign_up');
    }

    const handleCancel = () => {
        navigate('/');
    }
    
    const handleChangeDetails = () => {
        let signUpList = JSON.parse(localStorage.getItem('signUpList'))
        signUpList.pop()
        navigate('/sign_up');
    }

    // LOCAL STORAGE
    const data = JSON.parse(localStorage.getItem('signUpList'))
    const contactInfo = data[data.length - 1].contact;

    return (
        <>
        {/* <PageTemplate> */}
            <main>
                <div className="button-nav-container">
                    <button className='back-cancel-button' onClick={handleBack}>
                        <span class="material-symbols-rounded">arrow_back</span>
                        </button>
                    <button className='back-cancel-button' onClick={handleCancel}>
                        <span class="material-symbols-rounded">close</span>
                    </button>
                </div>

                <div className='center-container'>
                    <div className={styles['content-container']}>
                        <h1 className={styles['heading']}>Verify that it's you</h1>
                        <p className={styles['text']}> 
                            Please confirm your identity by following the verification link we sent to 
                            <p style={{display:'inline', fontWeight: '600', color: 'var(--colour-primary)'}}> {verifDetails.inputContact}</p>.
                        </p>
                        <div className={styles['loader-wrapper']}>
                            <div className={`loader ${styles['verify-loader']}`}></div>
                            <p>Waiting for verification link to be clicked...</p>
                        </div>
                        <div className={styles['button-container']}>
                            <button className={styles['change-button']} onClick={handleChangeDetails}>Change details</button>
                            <button onClick={handleClick} className='next-button'>Resend Link</button>
                        </div>
                    </div>
                </div>
            </main>
        {/* </PageTemplate> */}
        </>
    );
};

export default Verify