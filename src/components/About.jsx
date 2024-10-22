import styles from '../scss/modules/About.module.scss';
import { useNavigate } from 'react-router-dom';
import { RollingNumber } from '@layflags/rolling-number';
import PageTemplate from './PageTemplate';


// Hold our info cards, 1-4
const aboutCardArray = [
    {
        title: 'Sign up',
        desc: 'with your email or phone number',
        img: ''
    },
    {
        title: 'Dispense sunscreen',
        desc: 'and apply to stay SunSafe',
        img: ''
    },
    {
        title: 'Earn points',
        desc: 'instantly while using SunStop',
        img: ''
    },
    {
        title: 'Redeem rewards',
        desc: 'and exclusive merchandise!',
        img: ''
    },
];
console.log(aboutCardArray);

function initAboutCards() {
    // HTML array
    const renderedAboutCardArr = [];

    const cardsNo = aboutCardArray.length;
    for (let i = 0; i < cardsNo; i++) {
        renderedAboutCardArr.push(renderAboutCard((i + 1), aboutCardArray[i].title, aboutCardArray[i].desc, aboutCardArray[i].img));
    }

    return ( 
        <>
            {renderedAboutCardArr}
        </>
    );
}
function renderAboutCard(no, title, desc, img) {
    return (
        <>
        <div className={styles["card-body"]}>
            <h2>{no}</h2>
            <h1>{title}</h1>
            <p>{desc}</p>
            <div className={styles['card-img-container']}>
                <img></img>
            </div>
        </div>
        </>
    )
}

function About() {
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
    
    return (
        <>
        <PageTemplate>
            {/* Wrap content */}
            <main id={styles['main']}>
                {/* Main head: back btn mostly */}
                <div id={styles['main-head']}>
                    <button className='btn-back'>Back</button>
                </div>
                
                {/* Cards carousel: each card contains a handle for sending user to dispenseActive
                along with template objects which specify how to render the body figure */}
                <div id={styles['main-cards']}>
                    {initAboutCards()}
                </div>
                {/* Ben put your code here */}
            </main>
        </PageTemplate>
        </>
    );
}

export default About