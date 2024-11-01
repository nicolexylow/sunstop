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
import PageTemplate from './components/PageTemplate';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion"
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
if( !isLSValid ) {
  // Dev login
  const devSignUp = [{contact: 'dev@dev', name: 'Developer', points: 400}];
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

// Animate between pages, woo!
const AnimationLayout = () => {
  const { pathname } = useLocation();
  return (
    <PageTemplate>

        <Outlet />

    </PageTemplate>
  );
};

function App() {
  return (
    <Router>
      {/* <PageTemplate> */}
        <Routes>
          <Route element={<AnimationLayout />}> 
            <Route path="/" element={<ScreenSaver />} /> 
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
