import styles from '../scss/modules/About.module.scss';
import { useNavigate } from 'react-router-dom';
import { RollingNumber } from '@layflags/rolling-number';
//import PageTemplate from './PageTemplate';

// Imgs
import imgAbout1 from '../assets/sign-up.png';
import imgAbout2 from '../assets/sunscreen.png';
import imgAbout3 from '../assets/star.png';
import imgAbout4 from '../assets/btn-reward.png';


// Hold our info cards, 1-4
const aboutCardArray = [
    {
        title: 'Sign up',
        desc: 'with your email or phone number',
        img: imgAbout1
    },
    {
        title: 'Dispense sunscreen',
        desc: 'and apply to stay SunSafe',
        img: imgAbout2
    },
    {
        title: 'Earn points',
        desc: 'instantly while using SunStop',
        img: imgAbout3
    },
    {
        title: 'Redeem rewards',
        desc: 'and exclusive merchandise!',
        img: imgAbout4
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
                <img src={img}></img>
            </div>
        </div>
        </>
    )
}

function About() {
    // Navigation here
    const navigate = useNavigate();
        // Log out btn
        const handleLogOutTap = () => {
            navigate('/');
        };
    
    return (
        <>
        {/* <PageTemplate> */}
            {/* Wrap content */}
            <main id={styles['main']}>
                {/* Main head: back btn mostly */}
                <div id={styles['main-head']}>
                    <button className="btn-icon">
                        <span class="material-symbols-rounded" onClick={() => navigate(-1)}>arrow_back</span>
                    </button>                
                </div>
                
                {/* Cards carousel: each card contains a handle for sending user to dispenseActive
                along with template objects which specify how to render the body figure */}
                <div id={styles['main-cards']}>
                    {initAboutCards()}
                </div>
                {/* Ben put your code here */}
            </main>
        {/* </PageTemplate> */}
        </>
    );
}

export default About