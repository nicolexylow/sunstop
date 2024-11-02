import styles from '../scss/modules/SignUp.module.scss';
import backIcon from '../assets/back_icon.png';
import cancelIcon from '../assets/cancel_icon.png';
import '../scss/global.scss'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react';
import store from 'store2'
import { motion, AnimatePresence, easeOut } from "framer-motion"
import { forwardRef } from 'react';

function SignUp() {
    const navigate = useNavigate();

    console.log(store.get('signUpList'));
    console.log(localStorage);

    /* LOCAL STORAGE */
    // Documentation for store2 localstorage handling can be found here:
    // https://www.npmjs.com/package/store2
    // --> Short version is no json parsing, just use store.get() and store.set()
    const [inputContact, setInputContact] = useState('');   
    const [signUpList, setSignUpList] = useState(store.get('signUpList'));
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
    const [btnActive, setBtnActive] = useState(`disabled`);
    const inputRef = useRef(null);

    // Cool func for shifting up interface, to fit soft keyboard, if input is active
    const [contentShifty, setContentShifty] = useState(false)
    
    /* Options for page transitions */
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
                <div className='signup-progtrack-container'>
                    <div className='signup-progtrack'>
                        <div className={`signup-progtrack-active prog-1`}></div>
                    </div>
                </div>
                <div className="button-nav-container">
                    <button className='btn-icon' onClick={handleBack}>
                        <span class="material-symbols-rounded">arrow_back</span>
                    </button>
                </div>
                <motion.div
                    key={pathname}
                    initial="initial"
                    animate="in"
                    variants={pageVariants}
                    transition={pageTransition}
                >
                    <div className={`center-container ${contentShifty ? `up` : null}`}>
                        <div className={styles['content-container']}>
                            <div className='signup-head'>
                                <h1>Log in or sign up</h1>
                                <p>Sign into an existing account, or register now to <strong style={{display:'inline', fontWeight: '600', color: 'var(--colour-primary)', letterSpacing: '0.25px'}}>get free sunscreen and exclusive rewards.</strong></p>
                            </div>
                            {/* Our cool input form! */}
                            <form className={styles['form']} onSubmit={handleSubmit}>
                                <input 
                                    type="text" 
                                    placeholder='Email or Phone' 
                                    className='input-field' 
                                    ref={inputRef}
                                    value={inputContact}
                                    //onFocus={() => { setContentShifty(true); console.log(contentShifty)}}
                                    //onBlur={() => { setContentShifty(false); console.log(contentShifty)}}
                                    onChange={(e) => {
                                        setInputContact(e.target.value); 
                                        console.log(e.target.value); 
                                        if (e.target.value == '') {
                                            setBtnActive(`disabled`);
                                            console.log(e.target.value)
                                        } else {
                                            setBtnActive(`enabled`);
                                            console.log(e.target.value)
                                        }
                                    }} 
                                    //onChange={handleInputTap}
                                    required
                                /> 
                                <div className={styles['submit-button-container']}>
                                    <input className={`next-button ${btnActive}`} type="submit" value="Next"/>
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