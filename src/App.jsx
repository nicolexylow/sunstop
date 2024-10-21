import './scss/manifest.scss'
import ScreenSaver from './components/ScreenSaver'
import SignUp from './components/SignUp';
import Dispense from './components/Dispense';
import Verify from './components/Verify';
import ConfirmVerify from './components/ConfirmVerify';
  import DispenseActive from './components/DispenseActive';
  import DispensePoints from './components/DispensePoints';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./ReactotronConfig"

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<ScreenSaver />} /> 
        <Route path="/sign_up" element={<SignUp />} /> 
        <Route path="/verify" element={<Verify />} /> 
        <Route path="/confirm_verify" element={<ConfirmVerify />} /> 
        <Route path="/dispense" element={<Dispense />} /> 
        <Route path="/dispense-active" element={<DispenseActive />} /> {/* Home page */}
        <Route path="/dispense-points" element={<DispensePoints />} /> {/* Home page */}
      </Routes>
    </Router>
  );
}

export default App
