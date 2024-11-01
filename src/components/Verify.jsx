import { useNavigate, useLocation } from 'react-router-dom'
import styles from '../scss/modules/Verify.module.scss';
import '../scss/global.scss';
import backIcon from '../assets/back_icon.png';
import cancelIcon from '../assets/cancel_icon.png';
import PageTemplate from './PageTemplate';
import { useState, useEffect } from 'react';
import store from 'store2';
import axios from "axios";

let APICall = false;
// Hoo boy submit email time
async function initVerifyEmail(to) {
    const navigate = useNavigate();
    //const handleClick = async (e) => {

        console.log(`${to}`)
        try {
            await axios.post("/api/send", {
                from: "Sunstop Verify sunstopverify@gmail.com",  
                to,
                subject: "Please verify your Email"
            });
            console.log("Email sent!");

            while (!APICall) {
                await new Promise(resolve => setTimeout(resolve, 1500));
                waitForVerif();
            }
            navigate('/confirm_verify');
            //});
        } catch(err) {
            console.log(err);
        }
    //};
}

async function waitForVerif() {
    try {
        await axios.get("/api/handle/verify");
        console.log("Verif successful haha!");
        APICall=true;
    } catch(err) {
        console.log(err);
    }
};


function waitForVerif1() {
    async function waitForVerif() {
        while (true) {
          await new Promise(resolve => setTimeout(resolve, 500));
          let poor = await axios.post("/api/handle/verify");
            try {
                poor();
                console.log(poor.data)
                console.log(await axios.post("/api/handle/verify"));
                console.log("Attempt verif");
            } catch(err) {
                console.log(err);
            }
        }
      }
      waitForVerif();
};



function initVerifyPhone() {

}

function Verify() {
    const navigate = useNavigate();
    const location = useLocation();
    // Grabs two variables from last page:
    // verifDetails.inputContact contains phone number or email string (from user)
    // verifDetails.method contains 'phone' or 'email' string
    const verifDetails = location.state;
    console.log(verifDetails);
    if ( verifDetails.method == "email") {
        initVerifyEmail(verifDetails.inputContact);
    } else if (verifDetails.method == "phone") {
        initVerifyPhone(verifDetails.inputContact);
    }

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
                            <strong style={{display:'inline', fontWeight: '600', color: 'var(--colour-primary)'}}> {verifDetails.inputContact}</strong>.
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