import './App.css'
import ScreenSaver from './components/ScreenSaver'
import SignUp from './components/SignUp';
import Dispense from './components/Dispense';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<ScreenSaver />} /> {/* Home page */}
        <Route path="/sign-up" element={<SignUp />} /> {/* Home page */}
        <Route path="/dispense" element={<Dispense />} /> {/* Home page */}
      </Routes>
    </Router>
  );
}

export default App
