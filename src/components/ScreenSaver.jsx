import styles from '../scss/modules/ScreenSaver.module.scss';

function ScreenSaver() {
    

    return (
        <>
        <div className={styles['top-section']}>
            <p className={styles['p']}>Today's UV Index</p>
            <p className={styles['p']}>Temp: 21°C</p>
        </div>

        <div className={styles['content-container']}>
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
        </>
    );
}

export default ScreenSaver