import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import logo from '../assets/SunStop_logo.png';

const PageTemplate = ({ props, children }) => {
    console.log(props);
    const navigate = useNavigate();
    // Clock logic
    const [time, updateTime] = useState(new Date());
    const [hour, updateHour] = useState(time.getHours());
    const [currentUV, updateCurrentUV] = useState(0);

    // Code borrowed from https://saurabhnativeblog.medium.com/react-30-project-3-building-a-digital-clock-app-with-react-js-3b198962e92c
    useEffect(() => {
        // timer updation logic
        const timer = setInterval(() => {
          updateTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
      }, []);

    console.log(hour);

    for( let i = 0; i < props.uvData.length; i++ ) {
        if (i==hour) {
            currentUV = props.uvData[i];
        }
    }

    return (
        <>
        <div className='page-template-main-container'>
            <header>
                <div id='header-lead-container'>
                    <img src={logo} alt="SunStop Logo" className='logo' />
                    <div className="time-container">
                        {/* print the string prettily */}
                        <span className="time">{time.toLocaleTimeString(undefined, {timeStyle:'short', hour12: true})}</span>
                    </div>
                    <div className="head-uv-container">
                        <span className={`material-symbols-rounded uv-warning-symbol`}>sunny</span>
                        <p>UV</p>
                        <p>{currentUV}</p>
                    </div>
                </div>
            </header>
            <div className="main-content">
                {children}
            </div>
        </div>
        </>
    );
}

export default PageTemplate