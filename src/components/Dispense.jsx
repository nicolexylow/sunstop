import styles from '../scss/modules/Dispense.module.scss';
import { useNavigate } from 'react-router-dom';

function Dispense() {
    // Navigation here
    const navigate = useNavigate();
        const handleTap = (outfitPush) => {
            navigate('/dispense-active', { state: { outfitPush } });
        }
        // We need another page to go back to. Maybe dashboard page?
        const handleBkTap = () => {
            navigate('/dispense');
        }
        const handleLogOutTap = () => {
            navigate('/')
        };

    // Outfit templates
    const outfitBeach = {
        img: 'beach',
        body: ['Face', 'Chest', 'Arms', 'Hands', 'Legs', 'Feet']
    };
    const outfitOffice = {
        img: 'office',
        body: ['Face', 'Arms', 'Hands']
    };
    const outfitCasual = {
        img: 'casual',
        body: ['Face', 'Arms', 'Hands', 'Legs']
    };
    const outfitCasuall = {
        img: 'casuall',
        body: ['Face', 'Arms', 'Hands' ]
    };
        // Push to dispensing page
        //const outfitPush = {
        //    img: 'beach',
        //    body: ['Face', 'Chest', 'Arms', 'Hands', 'Legs', 'Feet']
        //};
    
    return (
        <>
        {/* Wrap content */}
        <div id='wrapper'>
            {/* Header: Back btn, indexical title, logout */}
            <header>
                <button className="btn-back" onClick={handleBkTap}>
                    <span className={`material-symbols-rounded`}>arrow_back</span>
                </button>
                <button className="btn-logout" onClick={handleLogOutTap}>Log out</button>
            </header>
            
            <div id={styles['main']}>
                {/* Main head: User logon message, points */}
                <div id={styles['main-head']}>
                    <h3>Welcome Chris</h3>
                    <p>0 points</p>
                </div>
                {/* H1, sub */}
                <div id={styles['main-title']}>
                <h1>How much sunscreen is needed?</h1>
                <h2>Select what you are wearing</h2>
                </div>
                {/* Cards carousel:  */}
                <div id={styles['main-cards']}>
                    <div className={styles["card-body"]} onClick={() => handleTap(outfitBeach)}>
                        <h2>Beach</h2>
                    </div>
                    <div className={styles["card-body"]} onClick={() => handleTap(outfitOffice)}>
                        <h2>Office</h2>
                    </div>
                    <div className={styles["card-body"]} onClick={() => handleTap(outfitCasual)}>
                        <h2>Casual</h2>
                    </div>
                    <div className={styles["card-body"]} onClick={() => handleTap(outfitCasuall)}>
                        <h2>Casual 2</h2>
                    </div>
                </div>
                {/* Ben put your code here */}
            </div>
        </div>
        </>
    );
}

export default Dispense