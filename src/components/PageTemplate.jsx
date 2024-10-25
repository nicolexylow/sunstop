import { useNavigate } from 'react-router-dom';
import logo from '../assets/SunStop_logo.png';

const PageTemplate = ({ children }) => {

    const navigate = useNavigate();
    const handleClickAbout = () => {
        navigate('/about');
    }

    return (
        <>
        <div className='page-template-main-container'>
            <header>
                <img src={logo} alt="SunStop Logo" className='logo' />
                <a className='about' onClick={handleClickAbout}>About ⓘ</a>
            </header>
            <div className="main-content">
                {children}
            </div>
        </div>
        </>
    );
}

export default PageTemplate