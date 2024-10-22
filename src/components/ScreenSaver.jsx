import styles from '../scss/modules/ScreenSaver.module.scss';
import '../scss/global.scss'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AreaChart from './AreaChart';
import { format } from 'date-fns';
import PageTemplate from './PageTemplate';


function ScreenSaver() {

    const [currentHour, setCurrentHour] = useState(new Date().getHours()); // Get initial hour
    const [uvIndexData, setUvIndexData] = useState([]);
    const [uvTimes, setUvTimes] = useState([]);
    const date = format(new Date(), "EEEE, do MMMM");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                'https://api.open-meteo.com/v1/forecast',
                {
                    params: {
                    latitude: -33.8924,
                    longitude: 151.1917,
                    hourly: ['uv_index', 'temperature_2m'],
                    timezone: 'Australia/Sydney',
                    forecast_days: 1,
                    },
                }
                );
                
                setUvIndexData(response.data.hourly.uv_index); 
    
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (uvIndexData.length > 0) {
            getWarningTime(); 
        }
    }, [uvIndexData]);

   const getWarningTime = () => {
        let times = []
        for (let i = 0; i < uvIndexData.length; i++) {
            if (uvIndexData[i] >= 3) {
                //format time
                const hour = i % 12 || 12;
                const suffix = i >= 12 ? 'PM' : 'AM';
                times.push(`${hour}${suffix}`);
            }
        }
        setUvTimes(times);
   }

    
    const handleTap = () => {
        navigate('/sign_up');
    }

    const handleAnchorTag = () => {
        navigate('/about');
    }


    return (
        <>
        <PageTemplate>
            <div onClick={handleTap} className={styles['content-container']}>
                <div className={styles['words-container']}>
                    <h1>Darlington</h1>
                    <p className={styles['current-date']}>{date}</p>

                    {uvTimes.length >= 2 && 
                        (<p className={styles['uv-warning']}>
                            ⚠ Sun protection is required from {`${uvTimes[0]} - ${uvTimes[uvTimes.length - 1]}`}
                        </p>)
                    }
                </div>
                <div className={styles['visuals']}>
                    <AreaChart data={uvIndexData}/>
                    <div className={styles['heading-section']}>
                        <h1 className={styles['h1']}>tap for<span className={styles['colour']}> free sunscreen </span></h1>
                        <div className={styles['sign-up-container']}>
                            <p className={styles['small']}>free sign up!</p>
                            <span className={`material-symbols-rounded ${styles['tap-icon']}`}>touch_app</span>
                        </div>
                    </div>
                </div>
            </div>
        </PageTemplate>
        </>
    );
}

export default ScreenSaver