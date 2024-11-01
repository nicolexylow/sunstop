import styles from '../scss/modules/SignUp.module.scss';
import backIcon from '../assets/back_icon.png';
import cancelIcon from '../assets/cancel_icon.png';
import '../scss/global.scss'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react';
import PageTemplate from './PageTemplate';
import store from 'store2'
import { motion, AnimatePresence, easeOut } from "framer-motion"

function SignUp() {
    const navigate = useNavigate();

    console.log(store.get('signUpList'));
    console.log(localStorage);

    /* LOCAL STORAGE */
    // Documentation for store2 localstorage handling can be found here:
    // https://www.npmjs.com/package/store2
    // --> Short version is no json parsing, just use store.get() and store.set()
    const [inputContact, setInputContact] = useState('');
    const [btnActive, setBtnActive] = useState(false);
    const [signUpList, setSignUpList] = useState( () => {
        return store.get('signUpList');
    });
    console.log(signUpList)

    /* SUBMIT HANDLING */
    // Genius validation expresions thanks to https://stackoverflow.com/a/13975255
    const validateEmail = (value) => {
        var input = document.createElement('input');
      
        input.type = 'email';
        input.required = true;
        input.value = value;
      
        // Complex but keeps browser compatibility
        return typeof input.checkValidity === 'function' ? input.checkValidity() : /\S+@\S+\.\S+/.test(value);
    }
    const validatePhone = (value) => {
        var input = document.createElement('input');
      
        input.type = 'tel';
        input.required = true;
        input.pattern = "[0-9]{3}-[0-9]{3}-[0-9]{3}";
        input.value = value;
      
        // Complex but keeps browser compatibility
        return typeof input.checkValidity === 'function' ? input.checkValidity() : /\S+@\S+\.\S+/.test(value);
    }
        const handleSubmit = (e) => {
            e.preventDefault();

            console.log(validateEmail(inputContact));
            console.log(validatePhone(inputContact));

            // Test if input is correct, if not then warn user input is incorrect
            // Then navigate to verify page, letting it know which verification method user has chosen
            if ( validateEmail(inputContact) ) {
                navigate('/verify', { state: { inputContact, method: "email" } });
            } else if ( validatePhone(inputContact)) {
                navigate('/verify', { state: { inputContact, method: "phone" } });
            } else {
                // Add warning tooltip: "please add valid phone or phone number!"
                return;
            }
        }

    // Nav buttons
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
    const handleInputTap = () => {
        if (inputRef.current.value = '') {
            setBtnActive(false);
        } else {
            setBtnActive(true);
        }
    };

    function RenderContinueBtn() {
        useEffect(() => {
            if (inputContact == '' ) {
                setBtnActive(false);
            } else {
                setBtnActive(true);
            }
        });
        if (!btnActive) {
            return (
            <input className={`next-button disabled`} type="submit" value="Next" ref={continueBtnRef}/>
            )
        } else {
            return (
            <input className={`next-button`} type="submit" value="Next" ref={continueBtnRef}/>
            )
        } 
    }

    /* Options for page transitions*/
    const pageVariants = {
        initial: {
        x: 40,    
        opacity: 0
        },
        in: {
        x: 0,
        opacity: 1
        },
        out: {
        x: -40, 
        opacity: 0
        }
    };
    const pageTransition = {
        type: 'tween',
        ease: easeOut,
        duration: 0.275
    }; 

    const { pathname } = useLocation();
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
                <motion.div
                    key={pathname}
                    initial="initial"
                    animate="in"
                    variants={pageVariants}
                    transition={pageTransition}
                >
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
                                    oninput={handleInputTap}
                                    onChange={(e) => setInputContact(e.target.value)} 
                                    required
                                /> 
                                <div className={styles['submit-button-container']}>
                                    <RenderContinueBtn />
                                </div>
                            </form>

                        </div>
                    </div>
                </motion.div>
            </main>
        {/* </PageTemplate> */}
        </>
    );
}

export default SignUp