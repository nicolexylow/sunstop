import styles from '../scss/modules/DispensePoints.module.scss';
import { useNavigate } from 'react-router-dom';
import { RollingNumber } from '@layflags/rolling-number';

/* 
###############
## Variables ##
###############
*/

/* USER POINTS */
// There are four milestones, reached at each multiple of 200 up to
// 800 points
const userPoints = 320;
const userPointsMax = 1000;
// How many points has user gained?
const userPointsGained = 200;
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
            </div>
            <h1 class={styles['points-gained']}>+{userPointsGained}</h1>
        </>
    )
}

// Milestone tracker stuff
function InitTrackerMilestones() {
    // How many milestones has user unlocked?
    // This season's milestones
    const milestoneArr = [
        {item: 'test1', img: 'laundry'},
        {item: 'test2', img: 'laundry'},
        {item: 'test3', img: 'laundry'},
        {item: 'test4', img: 'laundry'}
    ];

    const milestoneArrNo = milestoneArr.length;
    console.log(milestoneArrNo);
    const milestoneWidth = lineWidthHTML / milestoneArrNo;

    // HTML array
    const renderedMilestoneArr = [];

    // Pushing HTML elements to array
    for (let i = 0; i < milestoneArrNo; i++) {
        const iPoints = (i + 1) * 200;

        // If we've reached the user has just reached the points 
        // threshold, and it hasn't already been reached, push the
        // active milestone HTML
        if ( (iPoints / userPointsNew) <= 1 && (iPoints / userPoints) >= 1) {
            renderedMilestoneArr.push(RenderTrackerMilestone(milestoneWidth, `${i} ${milestoneArr[i].item}`, milestoneArr[i].img, 'active'));
        } 
        // If user reached milestone previously, push previously 
        // redeemed milestone HTML
        else if ( (iPoints / userPoints) <= 1 ) {
            renderedMilestoneArr.push(RenderTrackerMilestone(milestoneWidth, `${i} ${milestoneArr[i].item}`, milestoneArr[i].img, 'active-past'));
        } 
        // Otherwise, push unredeemed milestone HTML
        else {
            renderedMilestoneArr.push(RenderTrackerMilestone(milestoneWidth, `${i} ${milestoneArr[i].item}`, milestoneArr[i].img, 'default'));
        }
    };

    return ( 
        <>
            {renderedMilestoneArr}; 
        </>
    );
}
function RenderTrackerMilestone(lineWidthHTML, item, img, state) {

    return (
        <>
            {/* Wrap milestone elements */}
            <div className={`${styles['milestone']} ${styles[state]}`} key={item} style={{ width: lineWidthHTML }}>
                {/* Icon w/ img */}
                <div className={styles['milestone-icon-container']}>
                    <span className={`material-symbols-rounded`}>
                        laundry
                    </span>
                </div>
                {/* Line container, has hacky endpoint */}
                <div className={styles['milestone-line-container']}>
                    <div className={styles['milestone-endpoint']}> </div>
                    <div className={styles['milestone-line']}> </div>
                </div>
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
        {/* Wrap content */}
        <div id='wrapper'>
            {/* Header: Back btn, indexical title, logout */}
            <header>
                <button className="btn-back" onClick={handleBkTap}>
                    <span className={`material-symbols-rounded`}>arrow_back</span>
                </button>
                <button className="btn-logout" onClick={handleLogOutTap}>Log out</button>
            </header>
            
            <main id={styles['main']}>
                {/* Main head: Points counter */}
                <div id={styles['main-head']}>
                    <h3>Your score is now</h3>

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
                        {InitTrackerMilestones()}
                    </div>
                    <div id={styles['tracker-baseline-container']}>
                        {/* Baseline base */}
                        <div id={styles['tracker-baseline']}>

                        </div>
                        {/* Baseline active */}
                        {renderUserPointsLine()}
                    </div>
                </div>
                {/* Ben put your code here */}
            </main>
        </div>
        </>
    );
}

export default DispensePoints