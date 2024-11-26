import { useNavigate, useLocation } from 'react-router-dom'
import styles from '../scss/modules/Verify.module.scss';
import '../scss/global.scss';
//import PageTemplate from './PageTemplate';
import { useState, useEffect, useContext } from 'react';
import axios from "axios";
import store from 'store2'
import { AuthContext } from './_AuthContext';

/* INIT LOCAL STORAGE */
const existingSignUpList = store.get('signUpList');

// Reset api check
let loopAPIcheck = false;

// Hoo boy submit email time
async function initVerifyEmail(verifDetails, navigate, currentUser, setCurrentUser, currentUserId, setCurrentUserId) {
    const to = verifDetails.userContact;
    //const handleClick = async (e) => {

        console.log(`${to}`)
        try {
            await axios.post("/api/send", {
                from: "Sunstop Verify sunstopverify@gmail.com",  
                to,
                subject: "Please verify your Email"
            });
            console.log("Email sent!");

            // VERIFICATION:
            // HACK HACK HACK, but my backend knowledge is lacking. Loop this API check 
            // every 1.5suntil the API route detects that the user has clicked the link,
            // then waitForVerif() will positively charge the loopAPIcheck variable 
            while (!loopAPIcheck) {
                await new Promise(resolve => setTimeout(resolve, 1500));
                waitForVerif();
            }
            // Reset loop once verified, start finalising new user, or log in existing user
            finishVerify(verifDetails, navigate);
        } catch(err) {
            console.log(err);
        }
    //};
}

function finishVerify(verifDetails, navigate, currentUser, setCurrentUser, currentUserId, setCurrentUserId) {
    loopAPIcheck = false;
    console.log('finishing verification...')
    console.log(verifDetails)

    //verifDetails = {userContact, userContactMethod, userExists, {IF userExists -> (userId)}}

    // Either make new user and go to confirm_verify, or go to home if they exist
    if (verifDetails.userExists) {
        console.log('finishing verification...');
        setCurrentUser(existingSignUpList[verifDetails.userId]);
        setCurrentUserId(verifDetails.userId);
        navigate('/home');
    } else {
        // Random id
        const userId=Math.floor(Math.random() * Date.now()).toString(16);
        console.log(userId);
        const newUser = {
            contact: verifDetails.userContact, 
            name: 'Sunstop user', 
            subscribed: false, 
            points: 0, 
            rewards: { shirt1: 'default', hat2: 'default', sung3: 'default', jump4: 'default' }
        };
        
        let updatedSignUpList = {...existingSignUpList, [userId]:newUser};
        console.log(updatedSignUpList);
        store.set('signUpList', updatedSignUpList);

        navigate('/confirm_verify');
    };
};

// Check if user has clicked verif link
async function waitForVerif() {
    try {
        await axios.get("/api/handle/verify");
        // Once call is successful, set loopAPIcheck to break while loop above
        console.log("Verif successful haha!");
        loopAPIcheck=true;
    } catch(err) {
        console.log(err);
    }
};

function initVerifyPhone() {

};

function Verify() {
    const { currentUser, setCurrentUser, currentUserId, setCurrentUserId } = useContext(AuthContext); 

    const navigate = useNavigate();
    const location = useLocation();
    // {userContact, userContactMethod, userExists, {IF userExists -> (userId)}}
    const verifDetails = location.state;

    console.log(verifDetails);
    // Email or phone
    if ( verifDetails.userContactMethod == "email") {
        initVerifyEmail(verifDetails, navigate, currentUser, setCurrentUser, currentUserId, setCurrentUserId);
    } else if ( verifDetails.userContactMethod == "phone") {
        initVerifyPhone(verifDetails, navigate, currentUser, setCurrentUser, currentUserId, setCurrentUserId);
    } else {
        // Well there's some kind of error isn't there. Invalid characters perhaps?
    }

    // Temp solution since phone handling no work
    const handleClick = () => {
        finishVerify(verifDetails, navigate, currentUser, setCurrentUser, currentUserId, setCurrentUserId);
    }

    const handleBack = () => {
        navigate('/sign_up');
    }

    const handleCancel = () => {
        navigate('/');
    }
    
    const handleChangeDetails = () => {
        navigate('/sign_up');
    }

    return (
        <>
        {/* <PageTemplate> */}
            <main>
                <div className='signup-progtrack-container'>
                    <div className='signup-progtrack'>
                        <div className={`signup-progtrack-active prog-2`}></div>
                    </div>
                </div>
                <div className="button-nav-container">
                    <button className='btn-icon' onClick={handleBack}>
                        <span class="material-symbols-rounded">arrow_back</span>
                        </button>
                </div>

                <div className='center-container'>
                    <div className={styles['content-container']}>
                        <div className='signup-head'>
                            <h1>Verify that it's you</h1>
                            <p> 
                                Please confirm your identity by following the verification link we sent to 
                                <strong style={{display:'inline', fontWeight: '600', color: 'var(--colour-primary)', letterSpacing: '0.425px'}}> {verifDetails.userContact}</strong>.
                            </p>
                        </div>
                        <div className={styles['loader-wrapper']}>
                            <div className={`loader ${styles['verify-loader']}`}></div>
                            <p>Waiting for verification link to be clicked...</p>
                        </div>
                        <div className={styles['button-container']}>
                            <button className={styles['change-button']} onClick={handleChangeDetails}>Cancel</button>
                            <button onClick={handleClick} className='next-button2'>
                                <span class="material-symbols-rounded">
                                send
                                </span>
                                Resend link
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        {/* </PageTemplate> */}
        </>
    );
};

export default Verify