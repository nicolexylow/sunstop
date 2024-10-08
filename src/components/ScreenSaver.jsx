import styles from '../css/ScreenSaver.module.scss';

function ScreenSaver() {
    return (
        <>
        <div className={styles['top-section']}>
            <p className={styles['p']}>Today's UV Index</p>
            <p className={styles['p']}>Temp: 21°C</p>
        </div>

        <div className={styles['visuals']}>
            <span class={`material-symbols-rounded ${styles['weather-icon']}`}>sunny</span>
            <div className="measurement">
                {/* Ben put your code here */}
            </div>
        </div>
        </>
    )
}

export default ScreenSaver