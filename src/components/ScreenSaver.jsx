import styles from '../scss/modules/ScreenSaver.module.scss';
import { useNavigate } from 'react-router-dom';

function ScreenSaver() {

    const navigate = useNavigate();
    
    const handleTap = () => {
        navigate('/sign_up');
    }

    return (
        <>
        <div className='click-area' onClick={handleTap}>
            <div className={styles['top-section']}>
                <p className={styles['p']}>Today's UV Index</p>
                <p className={styles['p']}>Temp: 21°C</p>
            </div>

            <div onClick={handleTap} className={styles['content-container']}>
                <div className={styles['visuals']}>
                    <span className={`material-symbols-rounded ${styles['weather-icon']}`}>sunny</span>
                    <div className="measurement">
                        {/* Ben put your code here */}
                    </div>
                </div>

                <div className={styles['heading-section']}>
                    <h1 className={styles['h1']}>tap <span className={styles['small']}>for</span> sunscreen</h1>
                    <span className={`material-symbols-rounded ${styles['tap-icon']}`}>touch_app</span>
                </div>
            </div>
        </div>
        </>
    );
}

export default ScreenSaver