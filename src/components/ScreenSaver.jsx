import styles from '../scss/modules/ScreenSaver.module.scss';
import '../scss/global.scss'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, forwardRef } from 'react';
import AreaChart from './AreaChart';
import { format } from 'date-fns';
//import PageTemplate from './PageTemplate';
import logo from '../assets/SunStop_logo.png';

const MyInput = forwardRef(function MyInput(props, ref) {
    const { label, ...otherProps } = props;
    return (
      <label>
        {label}
        <input {...otherProps} ref={ref} />
      </label>
    );
  });

function ScreenSaver( props ) {
    const [currentHour, setCurrentHour] = useState(new Date().getHours()); // Get initial hour
    const [uvTimes, setUvTimes] = useState([]);
    const date = format(new Date(), "EEEE, do MMMM");
    const navigate = useNavigate();

    useEffect(() => {
        if (props.uvData.length > 0) {
            getWarningTime(); 
        }
    }, [props.uvData]);
    
   const getWarningTime = () => {
        let times = []
        for (let i = 0; i < props.uvData.length; i++) {
            if (props.uvData[i] >= 3) {
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
        {/* <PageTemplate> */}
            <div onClick={handleTap} className={styles['content-container']}>
            <div id={styles['main-head']}>
                <div className={styles['words-container']}>
                    <h1>Darlington</h1>
                    <p>•</p>
                    <p className={styles['current-date']}>{date}</p>
                </div>
                {uvTimes.length >= 2 && 
                        (<div className={styles['uv-warning']}>
                            <span className={`material-symbols-rounded ${styles['uv-warning-symbol']}`}>
                            brightness_alert
                            </span>
                            <p>Sun protection is required from {`${uvTimes[0]} – ${uvTimes[uvTimes.length - 1]}`}</p>
                        </div>)
                    }
            </div>
                <div className={styles['visuals']}>
                    <AreaChart data={props.uvData}/>
                    <button className={`btn-scnd ${styles['heading-section']}`}>
                    <span className={`material-symbols-rounded ${styles['tap-icon']}`}>touch_app</span>
                        <div id={styles['heading-secion-leadandtext']}>
                            <h1 className={styles['h1']}>Get   <span className={styles['colour']}> free sunscreen </span></h1>
                        </div>
                        <div className={styles['sign-up-container']}>
                            <p className={styles['small']}>Sign up now!</p>
                        </div>
                    </button>
                </div>
            </div>
        {/* </PageTemplate> */}
        </>
    );
}

export default ScreenSaver