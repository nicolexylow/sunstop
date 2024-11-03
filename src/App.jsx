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

/* INIT LOCAL STORAGE */
// Get existing list
const existingSignUpList = store.get('signUpList');
// Test if it's not just an empty array (fallback for known issue)
const isLSValid = (array) => {
    if ( array == null || array.length == 0 ) {
        return false;
    } else {
        return true;
    }
  };
console.log(isLSValid(existingSignUpList));
// Check if list is empty, if so, plug in dev login and print deets, if not, 
// just print deets
if( !isLSValid(existingSignUpList) ) {
  // Dev login
  const devSignUp = [{contact: 'dev@dev', name: 'Developer', subscribed: false, points: 400, unredeemed: [{ item: '1shirt', img: imgReward1, title: 'Sunstop T-Shirt' }]}];
  // Sets local storage
  store.set('signUpList', devSignUp);
  console.log(localStorage);
  console.log(store.get('signUpList'))
} else {
  console.log(localStorage);
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
    //const location = useLocation();
    //const uvPull = location.state.uvData;
    console.log(props);
    // Clock logic
    const [time, updateTime] = useState(new Date());
    const [hour, updateHour] = useState(time.getHours());
    const [currentUV, updateCurrentUV] = useState(0);

    // Code borrowed from https://saurabhnativeblog.medium.com/react-30-project-3-building-a-digital-clock-app-with-react-js-3b198962e92c
    useEffect(() => {
      // timer updation logic
      console.log('apple');
      const timer = setInterval(() => {
        updateTime(new Date());

        updateHour(time.getHours());
        console.log('apple2');
        for( let i = 0; i < props.uvData.length; i++ ) {
          console.log(`${i} ${hour}`)
          if (i==hour) {
              updateCurrentUV(props.uvData[i]);
              console.log(currentUV);
          }
      }
      }, 10000);
      return () => clearInterval(timer);
    }, []);

    console.log(hour);


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
                          <div>
                            <p>UV</p>
                            <p>{currentUV}</p>
                          </div>
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

/* CUT
// Animate between pages, woo?
function AnimationLayout(props) {
  console.log(props);
  const { pathname } = useLocation();
  return (
    <PageTemplate uvData={props.uvData}>

        <Outlet />

    </PageTemplate>
  );
}; */

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
      {/* <PageTemplate> */}
        <Routes>
          <Route element={<PageTemplate uvData={uvIndexData}/>}> 
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
        </Routes>
      {/* </PageTemplate> */}
    </Router>
  );
}

export default App
