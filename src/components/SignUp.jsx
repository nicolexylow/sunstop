import styles from '../scss/modules/SignUp.module.scss';
import backIcon from '../assets/back_icon.png';
import cancelIcon from '../assets/cancel_icon.png';
import '../scss/global.scss'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react';
import PageTemplate from './PageTemplate';
import store from 'store2'

function SignUp() {
    const navigate = useNavigate();

    console.log(store.get('signUpList'));
    console.log(localStorage);

    // LOCAL STORAGE
    // Documentation for store2 localstorage handling can be found here:
    // https://www.npmjs.com/package/store2
    const [inputContactEmail, setInputContactEmail] = useState('');
    const [inputContactPhone, setInputContactPhone] = useState('');
    const [btnActive, setBtnActive] = useState(false);
    const [signUpList, setSignUpList] = useState( () => {
        return store.get('signUpList');
    });
    console.log(signUpList)

    // UNDONE: No need to push to signUpList if they haven't
    // finished signing up yet (see next page)
    //useEffect(() => {
    //    store.set('signUpList', signUpList);
    //}, [signUpList]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Move this stuff to next page
        //const newSignUpList = [...signUpList, {contact: inputContact, name: '', points: 0}];
        //setSignUpList(newSignUpList);
        //localStorage.setItem('signUpList', JSON.stringify(newSignUpList));
        //setInputContactEmail('');
        //setInputContactPhone('');
        console.log(inputContactEmail);
        console.log(inputContactPhone);
        // Don't let use pass through if both are empty
        if (inputContactEmail == '' && inputContactPhone == '') {
            return;
        } else if (inputContactEmail == '') {
            // Push Phone if Email blank
            navigate('/verify', { state: { inputContactPhone } });
        } else if (inputContactPhone == '') {
            // Vice versa
            navigate('/verify', { state: { inputContactEmail } });
        }         
    }

    const handleBack = () => {
        navigate('/');
    }

    const handleCancel = () => {
        navigate('/');
    }

    // Make inputs mutually exclusive
    // Also potentially roll renderContinueBtn() functionality into this
    // function? Ongoing.
    const emailInputRef = useRef(null);
    const phoneInputRef = useRef(null);
    const continueBtnRef = useRef(null);
    const handleInputSwap = (activeField) => {
        useEffect(() => {
            if (activeField == 'first') {
                emailInputRef.current.value = '';
                setBtnActive(true);
            } else {
                phoneInputRef.current.value = '';
                setBtnActive(true);
            }
            if (phoneInputRef.current.value == '' && emailInputRef.current.value == '' ) {
                //continueBtnRef.current.classList.add('disabled')
            }
        });
    }

    // TODO: Make this work. Currently quite buggy
    // Render button which is disabled unless either field is populated with text
    function renderContinueBtn() {
        useEffect(() => {
            if (inputContactEmail == '' && inputContactPhone == '') {
                setBtnActive(false);
            } else {
                setBtnActive(true);
            }
        });
        if (!btnActive) {
            return (
            <input className={`next-button disabled`} type="submit" value="Continue" ref={continueBtnRef}/>
            )
        } else {
            return (
            <input className={`next-button`} type="submit" value="Continue" ref={continueBtnRef}/>
            )
        } 
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
                                type="email" 
                                placeholder='Email' 
                                className='input-field1'
                                value={inputContactEmail}
                                ref={emailInputRef}
                                oninput={handleInputSwap('first')}
                                onChange={(e) => setInputContactEmail(e.target.value)} 
                            />
                            <br />
                            <br />
                            <input 
                                type="tel" 
                                pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}"
                                placeholder='Phone' 
                                className='input-field2'
                                value={inputContactPhone}
                                ref={phoneInputRef}
                                oninput={handleInputSwap('second')}
                                onChange={(e) => setInputContactPhone(e.target.value)} 
                            />
                            <br />
                            <div className={styles['submit-button-container']}>
                                {renderContinueBtn()}
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