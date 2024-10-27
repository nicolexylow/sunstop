import styles from '../scss/modules/Dispense.module.scss';
import { useNavigate } from 'react-router-dom';
import PageTemplate from './PageTemplate';

// Imgs
import imgBody1 from '../assets/body/beach.png';
import imgBody2 from '../assets/body/office.png';
import imgBody3 from '../assets/body/casual.png';
import imgBody4 from '../assets/body/other.png';


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
        img: imgBody1,
        body: ['Head', 'Chest', 'Arms', 'Hands', 'Legs', 'Feet'],
        gaps: 20
    };
    const outfitOffice = {
        img: imgBody2,
        body: ['Head', 'Arms', 'Hands'],
        gaps: 20
    };
    const outfitCasual = {
        img: imgBody3,
        body: ['Head', 'Arms', 'Hands', 'Legs'],
        gaps: 20
    };
    const outfitCasuall = {
        img: imgBody4,
        body: ['Head', 'Arms', 'Hands' ],
        gaps: 20
    };

    // LOCAL STORAGE NAME RETRIEVAL
    //const signUpList = JSON.parse(localStorage.getItem('signUpList'))
    //console.log(signUpList);
    //const signUpListLength = signUpList.length;
    //const name = signUpList[signUpList.length - 1].name
    
    return (
        <>
        <PageTemplate>
            {/* Wrap content */}
            <main id={styles['main']}>
                {/* H1, sub */}
                <div id={styles['main-head']}>
                    <div id={styles['main-title']}> 
                        <button className="btn-back">
                            <span class="material-symbols-rounded">arrow_back</span>
                        </button>
                        <h1>How much sunscreen do you need?</h1>
                    </div>
                    <h2>Select what you are wearing:</h2>
                </div>
                {/* Cards carousel: each card contains a handle for sending user to dispenseActive
                along with template objects which specify how to render the body figure */}
                <div id={styles['main-cards']}>
                    <div className={styles["card-body"]} onClick={() => handleTap(outfitBeach)}>
                        <img src={imgBody1}></img>
                        <h2>Beach</h2>
                    </div>
                    <div className={styles["card-body"]} onClick={() => handleTap(outfitOffice)}>
                        <img src={imgBody2}></img>
                        <h2>Office</h2>
                    </div>
                    <div className={styles["card-body"]} onClick={() => handleTap(outfitCasual)}>
                        <img src={imgBody3}></img>
                        <h2>Casual</h2>
                    </div>
                    <div className={styles["card-body"]} onClick={() => handleTap(outfitCasuall)}>
                        <img src={imgBody4}></img>
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