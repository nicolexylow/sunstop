import { useNavigate } from 'react-router-dom';
import logo from '../assets/SunStop_logo.png';

const PageTemplate = ({ children }) => {

    const navigate = useNavigate();
    const handleClickUser = () => {
        //navigate('/profile');
    }

    return (
        <>
        <div className='page-template-main-container'>
            <header>
                <img src={logo} alt="SunStop Logo" className='logo' />
                <button className='profile' onClick={handleClickUser}>
                    <span className={`material-symbols-rounded`}>account_circle</span>
                    <p>Profile</p>
                </button>
            </header>
            <div className="main-content">
                {children}
            </div>
        </div>
        </>
    );
}

export default PageTemplate