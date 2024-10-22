import { useNavigate } from 'react-router-dom';

import logo from '../assets/SunStop_logo.png';

function PageTemplate(props) {

    const navigate = useNavigate();
    const handleClickAbout = () => {
        navigate('/about');
    }

    return (
        <>
        <div className='page-template-main-container'>
            <div className="top-section">
                <img src={logo} alt="SunStop Logo" className='logo' />
                <a className='about' onClick={handleClickAbout}>About ⓘ</a>
            </div>
            <div className="main-content">
                {/* put prop code in here */}
            </div>
        </div>
        </>
    );
}

export default PageTemplate