import './App.css'
import ScreenSaver from './components/ScreenSaver'
import SignUp from './components/SignUp';
import Dispense from './components/Dispense';
import Verify from './components/Verify';
import ConfirmVerify from './components/ConfirmVerify';
import ThankYou from './components/ThankYou';
import About from './components/About';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<ScreenSaver />} /> 
        <Route path="/sign_up" element={<SignUp />} /> 
        <Route path="/verify" element={<Verify />} /> 
        <Route path="/confirm_verify" element={<ConfirmVerify />} /> 
        <Route path="/dispense" element={<Dispense />} /> 
        <Route path="/thank_you" element={<ThankYou />} /> 
        <Route path="/about" element={<About />} /> 
      </Routes>
    </Router>
  );
}

export default App
