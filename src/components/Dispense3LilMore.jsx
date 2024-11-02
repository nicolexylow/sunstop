import PageTemplate from "./PageTemplate";
import sunIcon from '../assets/sun_icon.png';
import styles from '../scss/modules/DispenseLilMore.module.scss';
import { useNavigate } from 'react-router-dom';
import ButtonProfile from './ButtonProfile';


function RenderProfileBtn(props) {
    console.log('rendering btn');
    return (
        <ButtonProfile>

        </ButtonProfile>
    )
}

function Dispense3LilMore() {
    const navigate = useNavigate();

    const handleMore = () => {
        navigate('/dispense4_active')
    }

    const handleFinish = () => {
        navigate('/home');
    }

    return (
        <>
        <RenderProfileBtn />
        {/* <PageTemplate> */}
            <div className="main-container">
                <div className={styles['content-container']}>
                    <img src={sunIcon} alt="SunStop Icon" className={styles['sun-icon']} />
                    <h1 className={styles['heading']}>Thank you for being <span className={styles['highlight-text']}>SunSafe</span>!</h1>
                </div>

                <div className={styles['button-container']}>
                    <button className={`${styles['more-button']} ${styles['button']}`} onClick={handleMore}>I need a little more sunscreen</button>
                    <button className={`${styles['finish-button']} ${styles['button']}`} onClick={handleFinish}>Finish</button>
                </div>
                
            </div>
        {/* </PageTemplate> */}
        </>
    );
}

export default Dispense3LilMore;