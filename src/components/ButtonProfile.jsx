import styles from '../scss/modules/ButtonProfile.module.scss';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Dialog_Confirm from './Dialog_Confirm';
import store from "store2";

/* 
###############
## Variables ##
###############
*/
// Get existing list
const existingSignUpList = store.get('signUpList');
// Test if it's not just an empty array (fallback for known issue)
const isLSValid = (array) => {
    if (array == null || array.length == 0) {
        return false;
    } else {
        return true;
    }
};
console.log(isLSValid(existingSignUpList));
console.log(store.get('signUpList'))

/* USER DETAILS */
// Object
let currentUser;
// Individual key recall
let userName;
let userContact;


if (!isLSValid(existingSignUpList)) {
    // Fallback to default login if LS is empty
    userName = 'Chris';
} else {
    // Populate page variables w/ user info
    currentUser = existingSignUpList[0];
    userName = currentUser.name;
    userContact = currentUser.contact;
    // Implement code to carry through user login state
};

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

function RenderEditDialog( props ) {
    const [inputContact, setInputContact] = useState('');   
    const [inputName, setInputName] = useState('');   
    const [btnActive, setBtnActive] = useState(`disabled`);

    // Log out btn
    const handleLogOutTap = () => {
        navigate('/');
        store.remove('currentUser');
    };
    // Log out btn
    const handleSubmit = () => {
        navigate('/');
        store.remove('currentUser');
    };

    return (
        <>
        <dialog>
        <div className={`dialog-container ${styles['edit-dialog-container']}`}>
            <div className={styles['head-container']}>
                <h1>Edit profile</h1>
            </div>
            <div className='content-container'>
                <div className={styles['input-wrapper']}>
                    <form className={styles['edit-form']} onSubmit={handleSubmit}>
                        <label for='field-name'>Username</label>
                        <input 
                            type="text" 
                            placeholder={userName}
                            id='field-name'
                            className='input-field' 
                            value={inputName}
                            onChange={(e) => {
                                setInputName(e.target.value); 
                                console.log(e.target.value); 
                                if (e.target.value == '') {
                                    setBtnActive(`disabled`);
                                    console.log(e.target.value)
                                } else {
                                    setBtnActive(`enabled`);
                                    console.log(e.target.value)
                                }
                            }} 
                            required
                        /> 
                        <label for='field-name'>Contact</label>
                        <input 
                            type="text" 
                            placeholder={userContact} 
                            id='field-name'
                            className='input-field' 
                            value={inputContact}
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
                            required
                        /> 
                        <label className={`input-checkbox-label ${styles['input-checkbox-subscribe']}`} >
                            <input 
                                type="checkbox" 
                                id='subscribe-check-verify'
                                className='input-checkbox' 
                                onChange={(e) => setInputName(e.target.value)} />
                                Get sunscreen application reminders every 2 hours when UV is high
                        </label>
                            <div className={styles['submit-button-container']}>
                                <input className={`next-button ${btnActive}`} type="submit" value="Save"/>
                            </div>
                    </form>
                </div>
            </div>
        </div>
        </dialog>
        </>
    )
}

function RenderOverflowMenu( props ) {
    // Log out btn
    const handleLogOutTap = () => {
        navigate('/');
        store.remove('currentUser');
    };
    // Log out btn
    const handleEditTap = () => {
        props.shareActive2(true);
        props.shareActive(false);
        console.log(shareActive2);
    };

    return (
        <>
        <dialog onClick={() => props.shareActive(false)}>
        <div className={styles['overflow-container']}>
            <button onClick={handleEditTap}>
                <span className={`material-symbols-rounded`}>settings</span>
                <p>Edit details</p>
            </button>
            <button onClick={handleLogOutTap}>
                <span className={`material-symbols-rounded`}>logout</span>
                <p>Logout</p>
            </button>
        </div>
        </dialog>
        </>
    )
}

function ButtonProfile( { rewards, children } ) {
    const [isOverflowActive, setOverflowActive] = useState(false);
    const [isEditActive, setEditActive] = useState(false);

    return (
        <>
        <button className={`btn-scnd ${styles['profile']}`} onClick={() => setOverflowActive( !isOverflowActive )}>
            <span className={`material-symbols-rounded`}>account_circle</span>
            <p>{userName}</p>
        </button>
        {isOverflowActive ? 
            <RenderOverflowMenu
            active={isOverflowActive}
            shareActive={setOverflowActive}
            active2={isEditActive}
            shareActive2={setEditActive}/>
        : null }
        {isEditActive ? 
            <RenderEditDialog
            active={isEditActive}
            shareActive={setEditActive}/>
        : null }
        </>
    )
}

export default ButtonProfile