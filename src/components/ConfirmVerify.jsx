import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from '../scss/modules/ConfirmVerify.module.scss';
import '../scss/global.scss';


function ConfirmVerify() {
    const [inputName, setInputName] = useState('');
    const [isSubcribed, setIsSubscribed] = useState(false);
    
    const [btnActive, setBtnActive] = useState(`disabled`);

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const signUpList = JSON.parse(localStorage.getItem('signUpList'));
        const existingData = signUpList[signUpList.length - 1];
        signUpList[signUpList.length - 1] = {...existingData, name: inputName};
        localStorage.setItem('signUpList', JSON.stringify(signUpList));
        setInputName('');
        navigate('/dispense0');
    }
    const handleBack = () => {
        navigate('/');
    }

    const handleCancel = () => {
        navigate('/', { state: verifDetails } );
    }

    return (
        <>
        {/* <PageTemplate> */}
            <main>
                <div className='signup-progtrack-container'>
                    <div className='signup-progtrack'>
                        <div className={`signup-progtrack-active prog-3`}></div>
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
                            <h1>Verification complete!</h1>
                            <p>Welcome! If you like, you can add a short username we can refer to you by below.</p>  
                        </div>
                        <form onSubmit={handleSubmit} className={styles['name-form']}>
                            <input 
                                type="text" 
                                placeholder='Username' 
                                className={`input-field ${styles['input-field-name']}`} 
                                value={inputName}
                                onChange={(e) => {
                                    setInputName(e.target.value)
                                    if (e.target.value == '') {
                                        setBtnActive(`disabled`);
                                        console.log(e.target.value)
                                    } else {
                                        setBtnActive(`enabled`);
                                        console.log(e.target.value)
                                    }
                                }}/>

                            <label className={`input-checkbox-label ${styles['input-checkbox-subscribe']}`} >
                            
                            <div><h4>Application reminders</h4>
                            <p>Send me sunscreen application reminders every 2 hours when UV is high</p></div>
                            <input 
                                type="checkbox" 
                                id='subscribe-check-verify'
                                className='input-checkbox' 
                                onChange={(e) => setIsSubscribed(e.target.value)}/>
                            </label>

                            <div className={styles['submit-button-container']}>
                                <input type="submit" value="No thanks" className={styles['nope-button']} />
                                <input type="submit" value="Submit" className={`next-button ${btnActive}`} />
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        {/* </PageTemplate> */}
        </>
    );
}

export default ConfirmVerify