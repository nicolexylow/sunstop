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
    // --> Short version is no json parsing, just use store.get() and store.set()
    const [inputContact, setInputContact] = useState('');
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
        console.log(inputContact);
        // Test if input is correct, if not then warn user input is incorrect
        if (1 == 1) {
            navigate('/verify', { state: { inputContact } });
        } else {
            // Add warning... can html input alert be dynamically popped up?
            return;
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
    const inputRef = useRef(null);
    const continueBtnRef = useRef(null);
    const handleInputSwap = (activeField) => {
        useEffect(() => {
            if (activeField == 'first') {
                emailInputRef.current.value = '';
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

                        {/* Our cool input form! */}
                        <form className={styles['form']} onSubmit={handleSubmit}>
                            <label for="details" className={styles['label']}>Free Sunscreen and Rewards</label>
                            <input 
                                type="text" 
                                placeholder='Email or Phone' 
                                className='input-field' 
                                ref={inputRef}
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
            </main>
        </PageTemplate>
        </>
    );
}

export default SignUp