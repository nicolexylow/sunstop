import './scss/manifest.scss'
import ScreenSaver from './components/ScreenSaver'
import SignUp from './components/SignUp';
import Verify from './components/Verify';
import ConfirmVerify from './components/ConfirmVerify';
import Home from './components/Home';
// Dispense pages
  import Dispense0 from './components/Dispense0';
  import Dispense1Active from './components/Dispense1Active';
  import Dispense3LilMore from './components/Dispense3LilMore';
  import Dispense4Active from './components/Dispense4Active';
import ThankYou from './components/ThankYou';
//import PageTemplate from './components/PageTemplate';

import imgReward1 from './assets/rewards/reward1.png';

import { format } from 'date-fns';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion"
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import store from "store2";
import "./ReactotronConfig"
import { AuthProvider } from './components/_AuthContext';

/* INIT LOCAL STORAGE */
// Get existing list
const existingSignUpList = store.get('signUpList');

// Check if list is empty, if so, plug in dev login and print deets, if not, just print deets
if( existingSignUpList == null ) {
  console.log('do')
  // Default dev login
  const devSignUp = {
    devUser: {
      contact: 'dev@dev', 
      name: 'Developer', 
      subscribed: false, 
      points: 380, 
      rewards: { shirt1: 'active-past', hat2: 'default', sung3: 'default', jump4: 'default' }
    }
  };
  // Sets local storage
  store.set('signUpList', devSignUp);
  console.log(store.get('signUpList'))
} else {
  console.log(store.get('signUpList'))
}

/* Options for page transitions*/
const pageVariants = {
  initial: {
    opacity: 0
  },
  in: {
    opacity: 1
  },
  out: {
    opacity: 0
  }
};
const pageTransition = {
  type: 'tween',
  ease: 'ease-out',
  duration: 0.5
}; 

import logo from './assets/SunStop_logo.png';
function PageTemplate( props ) {
  const [time, updateTime] = useState(new Date());
  const [currentUV, updateCurrentUV] = useState(0);
  const [currentHour, updateCurrentHour] = useState(0);

  // Code borrowed from https://saurabhnativeblog.medium.com/react-30-project-3-building-a-digital-clock-app-with-react-js-3b198962e92c
  useEffect(() => {
    // timer updation logic
    const timer = setInterval(() => {
      updateTime(new Date());
      updateCurrentHour(time.getHours());
    }, 1000);
    return () => clearInterval(timer);
  }, [currentHour, updateCurrentHour]);

  return (
    <>
    <div className='page-template-main-container'>
        <header>
            <div id='header-lead-container'>
                <img src={logo} alt="SunStop Logo" className='logo' /> 
                <div id='header-realtime-wrapper'>
                  <div className="time-container">
                      {/* print the string prettily */}
                      <span className="time">{time.toLocaleTimeString(undefined, {timeStyle:'short', hour12: true})}</span>
                  </div>
                  <div className="head-uv-container">
                      <span className={`material-symbols-rounded uv-warning-symbol`}>sunny</span>
                      {props.uvData.length > 0 && 
                        (<div>
                          <p>UV</p>
                          <p>{props.uvData[currentHour]}</p>
                        </div>)
                      }
                  </div>
                </div>
            </div>
        </header>
        <div className="main-content">
            <Outlet />
        </div>
    </div>
    </>
  );
}

function App() {
  const [uvIndexData, setUvIndexData] = useState([]);

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
  console.log(uvIndexData);

  

  return (
    <Router>
        <Routes>
          {/* PageTemplate wrapper with props for time and UV */}
          <Route element={<PageTemplate uvData={uvIndexData}/>}> 
          <Route element={<AuthProvider />}>
            <Route path="/" element={<ScreenSaver uvData={uvIndexData}/>} /> 
              {/* User flow */}
              <Route path="/sign_up" element={<SignUp />} /> 
              <Route path="/verify" element={<Verify />} /> 
              <Route path="/confirm_verify" element={<ConfirmVerify />} /> 
            <Route path="/home" element={<Home />} /> 
              {/* Dispense flow */}
              <Route path="/dispense0" element={<Dispense0 />} /> 
              <Route path="/dispense1_active" element={<Dispense1Active />} /> 
              <Route path="/dispense3_lilmore" element={<Dispense3LilMore />} /> 
              <Route path="/dispense4_active" element={<Dispense4Active />} /> 
              <Route path="/thank_you" element={<ThankYou />} /> 
              </Route>
          </Route>
        </Routes>
    </Router>
  );
}

export default App
