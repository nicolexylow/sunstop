import styles from '../scss/modules/ButtonProfile.module.scss';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './_AuthContext';
import store from "store2";

/* 
###############
## Variables ##
###############
*/

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

function RenderEditDialog( props ) {
    const [inputs, setInputs] = useState({name: '', contact: '', check: false});   
    const [btnActive, setBtnActive] = useState(`disabled`);
    const [localUserDetailsChange, setLocalUserDetailsChange] = useState(props.userDetails)
    const navigate = useNavigate();
    console.log(props.editActive);

    const updateCurrentUser = (key, val) => {
        console.log(`${key} ${val}`)
        setLocalUserDetailsChange(prevState => ({
            ...prevState,
            [key]: val
        }));
        console.log(localUserDetailsChange);
    }

    useEffect(() => {
        props.setUserDetails(localUserDetailsChange);
        console.log(props.userDetails);
    }, [localUserDetailsChange]);

    // Log out btn
    const handleLogOutTap = () => {
        navigate('/');
        store.remove('currentUser');
    };
    const handleSubmit = (e) => {
        console.log(e);
        e.preventDefault();
        // Check contact val, then check validity
        if (inputs.contact != '') {
            if (validateEmail(inputs.contact)) {
                updateCurrentUser('contact', inputs.contact)
            }
            if (validatePhone(inputs.contact)) {
                updateCurrentUser('contact', inputs.contact)
            }
        }
        // Check name val
        if (inputs.name != '') {
            updateCurrentUser('name', inputs.name)
        }
        // Check subscribe val
        if (inputs.check != props.userDetails.subcribed) {
            updateCurrentUser('subscribed', inputs.check)
        }
        props.shareEditActive(false);
    }
    // Close our dialogue
    const handleCloseTap = () => {
        props.shareEditActive(false);
    }

    const handleChangeText = (e) => {
        if ('value' in e.target) {
            const { name, value } = e.target;
            setInputs({
                ...inputs,
                [name]: value,
            });
        } else if ('checked' in e.target) {
            const { name, checked } = e.target;
            setInputs({
                ...inputs,
                [name]: checked,
            });
        }
        console.log(e);
            checkBtnAvailable();
    };

    const handleChangeCheck = (e) => {
        console.log(e);
        const { name, checked } = e.target;
        setInputs({
            ...inputs,
            [name]: checked,
        });
    };

    // Check our values if save btn is available
    useEffect(() => {
        checkBtnAvailable();
    }, [inputs]);

    const checkBtnAvailable = () => {
        if (inputs.name == '' && inputs.contact == '' && inputs.check == '') {
            setBtnActive(`disabled`);
        } else {
            setBtnActive(`enabled`);
        }
    }

    return (
        <>
        <dialog onClick={handleCloseTap}>
        <div className={`dialog-container ${styles['edit-dialog-container']}`} onClick={e => e.stopPropagation()}>
            <div className={styles['head-container']}>
                <h1>Edit profile</h1>
            </div>
            <div className='content-container'>
                <div className={styles['input-wrapper']}>
                    <form className={styles['edit-form']} onSubmit={handleSubmit}>
                        <label for='field-name'>Username</label>
                        <input 
                            type="text" 
                            placeholder={props.userDetails.name}
                            id='field-name'
                            className='input-field' 
                            value={inputs.name}
                            onChange={handleChangeText} 
                            name="name"
                        /> 
                        <label for='field-contact'>Contact</label>
                        <input 
                            type="text" 
                            placeholder={props.userDetails.contact} 
                            id='field-contact'
                            className='input-field' 
                            value={inputs.contact}
                            onChange={handleChangeText} 
                            name="contact"
                        /> 
                        <label className={`input-checkbox-label ${styles['input-checkbox-subscribe']}`} >
                            <div><h4>Application reminders</h4>
                            <p>Send me sunscreen application reminders every 2 hours when UV is high</p></div>
                            <input 
                                type="checkbox" 
                                id='subscribe-check-verify'
                                className='input-checkbox' 
                                onChange={handleChangeCheck} 
                                name="check"
                                />
                        </label>
                            <div className={styles['submit-button-container']}>
                                <input className={`btn-txt ${styles['dialog-btn-cancel']}`} type="cancel" onClick={handleCloseTap} value="Cancel"/>
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
    const navigate = useNavigate();
    // Log out btn
    const handleLogOutTap = () => {
        navigate('/');
        store.remove('currentUser');
    };
    // Log out btn
    const handleEditTap = () => {
        props.shareActive2(true);
        props.shareActive(false);
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

function ButtonProfile( props ) {
    const { currentUser, setCurrentUser, currentUserId, setCurrentUserId, emptyUser } = useContext(AuthContext);    
    const [isOverflowActive, setOverflowActive] = useState(false);
    const [isEditActive, setEditActive] = useState(false);

    return (
        <>
        <button className={`btn-scnd ${styles['profile']}`} onClick={() => setOverflowActive( !isOverflowActive )}>
            <span className={`material-symbols-rounded`}>account_circle</span>
            <p>{currentUser.name}</p>
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
            editActive={isEditActive}
            shareEditActive={setEditActive}
            userDetails={currentUser}
            setUserDetails={setCurrentUser}
            emptyUserLogin={emptyUser}
            />
        : null }
        </>
    )
}

export default ButtonProfile