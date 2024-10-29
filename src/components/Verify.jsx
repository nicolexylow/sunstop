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
    // Grab verification method from last page
    const location = useLocation();
    // Give this var 'Email' or 'Phone' for easy verification switching
    let verificationMethod = (Object.keys(location.state)[0]).slice(12);
    console.log(verificationMethod) 
    if (verificationMethod == "Email") {
        const signUpContact = location.state.inputContactEmail;
        console.log(signUpContact);
    } else {
        const signUpContact = location.state.inputContactPhone;
        console.log(signUpContact);
    }



    // LOCAL STORAGE
    const [inputContactEmail, setInputContactEmail] = useState('');
    const [inputContactPhone, setInputContactPhone] = useState('');
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
        <PageTemplate>
            <main>
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
                        <p className={styles['text']}>Please confirm your phone number following the verification link we sent to {contactInfo}.</p>
                        <div className={styles['button-container']}>
                            <button className={styles['change-button']} onClick={handleChangeDetails}>Change details</button>
                            <button onClick={handleClick} className='next-button'>Resend Link</button>
                        </div>
                    </div>
                </div>
            </main>
        </PageTemplate>
        </>
    );
}

export default Verify