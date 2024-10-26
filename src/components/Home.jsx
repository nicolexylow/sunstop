import styles from '../scss/modules/Home.module.scss';
import { useNavigate } from 'react-router-dom';
import { RollingNumber } from '@layflags/rolling-number';
import PageTemplate from './PageTemplate';

// Imgs
import imgBtnReward from '../assets/btn-reward.png';
import imgBtnSunscreen from '../assets/sunscreen.png';

import imgReward1 from '../assets/rewards/reward1.png';
import imgReward2 from '../assets/rewards/reward2.png';
import imgReward3 from '../assets/rewards/reward3.png';
import imgReward4 from '../assets/rewards/reward4.png';


/* 
###############
## Variables ##
###############
*/

/* USER POINTS */
// There are four milestones, reached at each multiple of 200 up to
// 800 points
const userPoints = 400;
const userPointsMax = 1000;
// How many points has user gained?
const userPointsGained = 10;
// New points total
let userPointsNew = 0;

// Total width of line container in html
const lineWidthHTML = 1000;
// Tracker line widthS
let trackLineWidth = userPoints;

/* 
###########
## Props ##
###########
*/

function renderScoreHead() {   
    userPointsNew = userPoints + userPointsGained;

    return (
        <>
            <div id={styles['points-total-container']}>                    
                <layflags-rolling-number className={styles['points-total-dial']}>
                    {userPointsNew}
                </layflags-rolling-number>
                <p> pts</p>
            </div>
            <h1 class={styles['points-gained']}>+{userPointsGained}</h1>
        </>
    )
}

// Milestone tracker stuff
function initTrackerMilestones() {
    // How many milestones has user unlocked?
    // This season's milestones
    const milestoneArr = [
        {item: 'test1', img: imgReward1},
        {item: 'test2', img: imgReward2},
        {item: 'test3', img: imgReward3},
        {item: 'test4', img: imgReward4}
    ];

    const milestoneArrNo = milestoneArr.length;
    console.log(milestoneArrNo);
    let milestoneWidth = lineWidthHTML / milestoneArrNo;

    // HTML array
    const renderedMilestoneArr = [];

    // Pushing HTML elements to array
    for (let i = 0; i < milestoneArrNo; i++) {
        const iPoints = (i + 1) * 200;

        if (i==0) {
            milestoneWidth = (lineWidthHTML / milestoneArrNo) - 50;
        } else {
            milestoneWidth = lineWidthHTML / milestoneArrNo;
        }

        // If we've reached the user has just reached the points 
        // threshold, and it hasn't already been reached, push the
        // active milestone HTML
        if ( (iPoints / userPointsNew) <= 1 && (iPoints / userPoints) >= 1) {
            renderedMilestoneArr.push(renderTrackerMilestone(milestoneWidth, `${i} ${milestoneArr[i].item}`, milestoneArr[i].img, 'active', iPoints));
        } 
        // If user reached milestone previously, push previously 
        // redeemed milestone HTML
        else if ( (iPoints / userPoints) <= 1 ) {
            renderedMilestoneArr.push(renderTrackerMilestone(milestoneWidth, `${i} ${milestoneArr[i].item}`, milestoneArr[i].img, 'active-past', iPoints));
        } 
        // Otherwise, push unredeemed milestone HTML
        else {
            renderedMilestoneArr.push(renderTrackerMilestone(milestoneWidth, `${i} ${milestoneArr[i].item}`, milestoneArr[i].img, 'default', iPoints));
        }
    };

    return ( 
        <>
            {renderedMilestoneArr}
        </>
    );
}
function renderTrackerMilestone(lineWidthHTML, item, img, state, pointsRequired) {

    return (
        <>
            {/* Wrap milestone elements */}
            <div className={`${styles['milestone']} ${styles[state]}`} key={item} style={{ width: lineWidthHTML }}>
                {/* Icon w/ img */}
                <div className={styles['milestone-icon-container']}>
                    <img src={img}></img>
                    <span className={`material-symbols-rounded ${styles['check']}`}>
                        check
                    </span>
                </div>
                {/* Line container, has hacky endpoint */}
                <div className={styles['milestone-line-container']}>
                    <div className={styles['milestone-endpoint']}> </div>
                    <div className={styles['milestone-line']}> </div>
                </div>
                <p className={styles['milestone-pointsreq']}>{pointsRequired}</p>
            </div>
        </>
    )
}

// Update user points on head and tracker
function initUserPointsUpdate() {

}
function renderUserPointsUpdate() {
}
function renderUserPointsLine() {
    // Calculate line width based on user points/points max
    // For now, points are the same as max line width
    trackLineWidth = userPointsNew;

    return (
        <>
        <div id={styles['tracker-baseline']} className={styles['active']} style={{ width: trackLineWidth }}>
        </div>
        </>
    )
}

/* 
###############
## Component ##
###############
*/

function DispensePoints() {
    //const test = RollingNumber();
    // Navigation here
    const navigate = useNavigate();
        // Next page
        const handleTap = (outfitPush) => {
            navigate('/dispense-active', { state: { outfitPush } });
        }
        // Back btn
        // We need another page to go back to. Maybe dashboard page?
        const handleBkTap = () => {
            navigate('/dispense');
        }
        // Log out btn
        const handleLogOutTap = () => {
            navigate('/')
        };
        

    return (
        <>
        <PageTemplate>
            {/* Wrap content */}
            <main id={styles['main']}>
                {/* Main head: User logon message, points */}
                <div id={styles['main-head']}>
                    <h3>Welcome Chris</h3>
                    {/* Points total and rolling text dial to signify new points */}
                    <div id={styles['points-container']}>
                        {renderScoreHead()}
                    </div>
                </div>
                
                {/* Points tracking progress counter */}
                <div id={styles['tracker-container']}>
                    {/* Our milestones sit here */}
                    <div id={styles['tracker-milestones-container']}>
                        {/* Insert row of milestones */}
                        {initTrackerMilestones()}
                    </div>
                    <div id={styles['tracker-baseline-container']}>
                        {/* Baseline base */}
                        <div id={styles['tracker-baseline']}>

                        </div>
                        {/* Baseline active */}
                        {renderUserPointsLine()}
                    </div>
                </div>
                {/* Reward/dispense buttons */}
                <div id={styles['twin-buttons-container']}>
                    <button className='btn-xl' id={styles['btn-rewards']}>
                        <div className={styles['btn-lead']}>
                            <img src={imgBtnReward}></img>
                        </div>
                        <p>Redeem <br></br>Rewards</p>
                    </button>
                    <button className='btn-xl' id={styles['btn-dispense']}>
                        <div className={styles['btn-lead']}>
                            <img src={imgBtnSunscreen}></img>
                        </div>
                        <p>Dispense<br></br>Sunscreen</p>
                    </button>
                </div>
                <div id={styles['footer']}>
                    <button id={styles['btn-logout-footer']} className="btn-logout" onClick={handleLogOutTap}>
                    <span className={`material-symbols-rounded`}>logout</span>
                    <p>Log out</p></button>
                </div>
            </main>
        </PageTemplate>
        </>
    );
}

export default DispensePoints