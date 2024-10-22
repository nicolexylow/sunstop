import styles from '../scss/modules/Dispense.module.scss';
import { useNavigate } from 'react-router-dom';
import PageTemplate from './PageTemplate';

function Dispense() {
    // Navigation here
    const navigate = useNavigate();
        // Next page
        const handleTap = (outfitPush) => {
            navigate('/dispense1-active', { state: { outfitPush } });
        }
        // Back btn
        // We need another page to go back to. Maybe dashboard page?
        const handleBkTap = () => {
            navigate('/dispense');
        }
        // Log out btn
        const handleLogOutTap = () => {
            navigate('/');
        };

    // Outfit templates
    const outfitBeach = {
        img: 'beach',
        body: ['Head', 'Chest', 'Arms', 'Hands', 'Legs', 'Feet']
    };
    const outfitOffice = {
        img: 'office',
        body: ['Head', 'Arms', 'Hands']
    };
    const outfitCasual = {
        img: 'casual',
        body: ['Head', 'Arms', 'Hands', 'Legs']
    };
    const outfitCasuall = {
        img: 'casuall',
        body: ['Head', 'Arms', 'Hands' ]
    };
    
    return (
        <>
        <PageTemplate>
            {/* Wrap content */}
            <main id={styles['main']}>
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
                {/* Cards carousel: each card contains a handle for sending user to dispenseActive
                along with template objects which specify how to render the body figure */}
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
            </main>
        </PageTemplate>
        </>
    );
}

export default Dispense