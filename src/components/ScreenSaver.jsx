import styles from '../scss/modules/ScreenSaver.module.scss';
import '../scss/global.scss'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function ScreenSaver() {

    const [uvIndexData, setUvIndexData] = useState([]);
    const [temperatureData, setTemperatureData] = useState([]);
    const [currentHour, setCurrentHour] = useState(new Date().getHours()); // Get initial hour

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                'https://api.open-meteo.com/v1/forecast',
                {
                    params: {
                    latitude: -33,
                    longitude: 151,
                    hourly: ['uv_index', 'temperature_2m'],
                    timezone: 'Australia/Sydney',
                    forecast_days: 1,
                    },
                }
                );
                
                setUvIndexData(response.data.hourly.uv_index); 
                setTemperatureData(response.data.hourly.temperature_2m); 
    
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
        console.log(uvIndexData);

        // Changes the hour to get the correct uv index and temperature
        const interval = setInterval(() => {
            const newHour = new Date().getHours();
            setCurrentHour(newHour);
        }, 60 * 1000); 

        // Clear interval on component unmount
        return () => clearInterval(interval);

    }, []);

    const navigate = useNavigate();
    
    const handleTap = () => {
        navigate('/sign_up');
    }

    return (
        <>
        <div className='main-container' onClick={handleTap}>
            <div className={styles['top-section']}>
                <p className={styles['p']}>Today's UV Index</p>
                <p className={styles['p']}>Temp: {temperatureData[currentHour]}°C</p>
            </div>

            <div onClick={handleTap} className={styles['content-container']}>
                <div className={styles['visuals']}>
                    <span className={`material-symbols-rounded ${styles['weather-icon']}`}>sunny</span>
                    <div className="measurement">
                        <h1>{uvIndexData[currentHour]}</h1>
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