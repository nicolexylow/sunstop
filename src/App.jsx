import './scss/manifest.scss'
import ScreenSaver from './components/ScreenSaver'
import SignUp from './components/SignUp';
import Verify from './components/Verify';
import ConfirmVerify from './components/ConfirmVerify';
import Home from './components/Home';
// Dispense pages
import Dispense0 from './components/Dispense0';
import Dispense1Active from './components/Dispense1Active';
//import Dispense2Done from './components/Dispense2Done';
import Dispense3LilMore from './components/Dispense3LilMore';
import ThankYou from './components/ThankYou';
import About from './components/About';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./ReactotronConfig"
import PageTemplate from './components/PageTemplate';
import Dispense4Active from './components/Dispense4Active';
//import EmailForm from './components/obsolete/TestEmail';
import store from "store2";

/* INIT LOCAL STORAGE */
// Get existing list
const existingSignUpList = store.get('signUpList');
// Check if list is null, if so, plug in dev login and print deets, if not, 
// just print deets
if(existingSignUpList == null) {
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

function App() {
  return (
    <Router>
      <Routes>
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
        <Route path="/about" element={<About />} /> 
        <Route path="/page_template" element={<PageTemplate />} />  
      </Routes>
    </Router>
  );
}

export default App
