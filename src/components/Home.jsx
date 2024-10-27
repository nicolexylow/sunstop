import styles from '../scss/modules/Home.module.scss';
import { useNavigate } from 'react-router-dom';
import { RollingNumber } from '@layflags/rolling-number';
import PageTemplate from './PageTemplate';
import HomeRewardDialog from './HomeReward';
import { useState } from 'react';

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
/* USER DETAILS */
let logInName;
let logInPoints;
console.log(JSON.parse(localStorage.getItem('signUpList')))
if (JSON.parse(localStorage.getItem('signUpList')) === null) {
    logInName = 'Chris';
    logInPoints = 5;
  } else {
    const signUpList = JSON.parse(localStorage.getItem('signUpList'));
    const signUpListLen = signUpList.length;
    logInName = signUpList[signUpListLen - 1].name;
    logInPoints = signUpList[signUpListLen - 1].points;
    console.log(signUpList[signUpListLen - 1].points);
  };


/* USER POINTS */
// There are four milestones, reached at each multiple of 200 up to
// 800 points
const userPoints = logInPoints;
const userPointsMax = 1000;
// How many points has user gained?
const userPointsGained = 20;
// New points total
let userPointsNew = 0;

// Total width of line container in html
const lineWidthHTML = 1000;
// Tracker line widthS
let trackLineWidth = userPoints;

/* REWARDS */
let rewardItems = [];

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
            <h1 className={styles['points-gained']}>+{userPointsGained}</h1>
        </>
    )
}

// Milestone tracker stuff
function initTrackerMilestones() {
    // How many milestones has user unlocked?
    // This season's milestones
    const milestoneArr = [
        {item: 'test1', img: imgReward1, title: 'Sunstop T-Shirt'},
        {item: 'test2', img: imgReward2, title: 'Sunstop Hat'},
        {item: 'test3', img: imgReward3, title: 'Sunstop Sunglasses'},
        {item: 'test4', img: imgReward4, title: 'Sunstop Jumper'}
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
            rewardItems = [];
            rewardItems.push(milestoneArr[i]);
            console.log(rewardItems);
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
};
function initReward() {

}

function handleRedeemTap() {
    
}

// Load our dialog which displays the great, cool reward dialog which totally didn't take
// me a fucking millenia to get working :)
function RenderDialog(props) {
    // Close our dialogue
    const handleClose = () => {
        props.activeShare(false);
    }
    // Check if active state is true
    if (props.active) {
        // Show dialog, and pass buttons to it
        return ( 
        <>
            <HomeRewardDialog 
                rewards={props.rewards}
            >
                <button className={`btn-outlined ${styles['dialog-btn-cancel']}`} onClick={handleClose}>
                    Cancel
                </button>
                <button className={`btn-scnd ${styles['dialog-btn-redeem']}`} onClick={handleClose}>
                    <img src={imgBtnReward}></img>
                    Redeem
                </button>
            </HomeRewardDialog>
        </>
        )
    }
    return;
}

/* 
###############
## Component ##
###############
*/

function DispensePoints() {
    const [isActive, setIsActive] = useState(false);
    const [haveRewards, setHaveRewards] = useState(false);

    //const test = RollingNumber();
    // Navigation here
    const navigate = useNavigate();
        // Dispense btn
        const handleDispenseTap = () => {
            navigate('/dispense0');
        }
        // Log out btn
        const handleLogOutTap = () => {
            navigate('/')
        };
    function renderRewardBtn() {
        if (userPointsNew > 100) {
            return (
                <button 
                className={'btn-xl active'} 
                id={styles['btn-rewards']} 
                onClick={() => setIsActive(true)}
                >
                    <div className={styles['btn-lead']}>
                        <img src={imgBtnReward}></img>
                    </div>
                    <p>Redeem <br></br>Rewards</p>
                </button>
            )
        } else {
            return (
                <button 
                className={'btn-xl inactive'} 
                id={styles['btn-rewards']} 
                >
                    <div className={styles['btn-lead']}>
                        <img src={imgBtnReward}></img>
                    </div>
                    <p>Redeem <br></br>Rewards</p>
                </button>
            )
        }
    }
        
    return (
        <>
        <PageTemplate>
            {/* Wrap content */}
            <main id={styles['main']}>
                {/* Main head: User logon message, points */}
                <div id={styles['main-head']}>
                    <h3>Hello {logInName}!</h3>
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
                    {renderRewardBtn()}
                    <RenderDialog
                        rewards={rewardItems}
                        active={isActive}
                        activeShare={setIsActive}
                    />
                    <button 
                        className={'btn-xl'} 
                        id={styles['btn-dispense']} 
                        onClick={handleDispenseTap}
                    >
                        <div className={styles['btn-lead']}>
                            <img src={imgBtnSunscreen}></img>
                        </div>
                        <p>Dispense<br></br>Sunscreen</p>
                    </button>
                </div>
                <div id={styles['footer']}>
                    <button id={styles['btn-logout-footer']} className="btn-logout" onClick={handleLogOutTap}>
                        <span className={`material-symbols-rounded`}>logout</span>
                        <p>Logout</p>
                    </button>
                </div>
            </main>
        </PageTemplate>
        </>
    );
}

export default DispensePoints