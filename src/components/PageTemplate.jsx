import { useNavigate } from 'react-router-dom';
import logo from '../assets/SunStop_logo.png';

const PageTemplate = ({ children }) => {
    const navigate = useNavigate();

    return (
        <>
        <div className='page-template-main-container'>
            <header>
                <img src={logo} alt="SunStop Logo" className='logo' />
                {/* Moved to pages that actually need it
                    <button className='profile'>
                        <span className={`material-symbols-rounded`}>account_circle</span>
                        <p>Profile</p>
                    </button>
                */}
            </header>
            <div className="main-content">
                {children}
            </div>
        </div>
        </>
    );
}

export default PageTemplate