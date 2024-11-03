import styles from '../scss/modules/Home.module.scss';
import { useNavigate } from 'react-router-dom';
import { RollingNumber } from '@layflags/rolling-number';
import Dialog_HomeReward from './Dialog_HomeReward';
import ButtonProfile from './ButtonProfile';
import { useState } from 'react';
import store from "store2";

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
// Get existing list
const existingSignUpList = store.get('signUpList');
// Test if it's not just an empty array (fallback for known issue)
const isLSValid = (array) => {
    if (array == null || array.length == 0) {
        return false;
    } else {
        return true;
    }
};
console.log(isLSValid(existingSignUpList));
console.log(store.get('signUpList'))

/* USER DETAILS */
let currentUser;
let userName;
let userPoints;

/* REWARDS */
const rewardItems = [];
const rewardItemsLength = rewardItems.length;
// Check later if user has unredeemed rewards
let unredeemedLength = 0;


if ( !isLSValid(existingSignUpList) ) {
    // Fallback to default login if LS is empty
    userName = 'Chris';
    userPoints = 5;
} else {
    // Populate page variables w/ user info
    currentUser = existingSignUpList[0];
    userName = currentUser.name;
    userPoints = currentUser.points;

    unredeemedLength = currentUser.unredeemed.length;
    console.log(unredeemedLength);
    for (let i = 0; i < unredeemedLength; i++) {
        rewardItems.push(existingSignUpList[0].unredeemed[i])
    }
    console.log(rewardItems);
    // Implement code to carry through user login state
};

/* USER POINTS */
// There are four milestones, reached at each multiple of 200 up to
// 800 points
const userPointsMax = 1000;
// How many points has user gained?
const userPointsGained = 20;
// New points total
const userPointsNew = userPoints + userPointsGained;

// Total width of line container in html
const lineWidthHTML = 1000;
// Tracker line widthS
let trackLineWidth = userPoints;


/* 
###########
## Props ##
###########
*/

function RenderScoreHead() {
    return (
        <>
            <div id={styles['points-total-container']}>
                <h4>Total points</h4>
                <layflags-rolling-number className={styles['points-total-dial']}>
                    {userPointsNew}
                </layflags-rolling-number>
            </div>
            <h1 className={styles['points-gained']}>+{userPointsGained}</h1>
        </>
    )
}

// Milestone tracker stuff
function InitTrackerMilestones() {
    // How many milestones has user unlocked?
    // This season's milestones
    const milestoneArr = [
        { item: '1shirt', img: imgReward1, title: 'Sunstop T-Shirt' },
        { item: '2hat', img: imgReward2, title: 'Sunstop Hat' },
        { item: '3sung', img: imgReward3, title: 'Sunstop Sunglasses' },
        { item: '4jump', img: imgReward4, title: 'Sunstop Jumper' }
    ];

    const milestoneArrNo = milestoneArr.length;
    console.log(milestoneArrNo);
    console.log(lineWidthHTML / milestoneArrNo);
    let milestoneWidth = lineWidthHTML / milestoneArrNo;

    // HTML array
    const renderedMilestoneArr = [];

    // Pushing HTML elements to array
    for (let i = 0; i < milestoneArrNo; i++) {
        const iPoints = (i + 1) * 200;

        // Make first milestone a bit shorter
        if (i == 0) {
            milestoneWidth = (lineWidthHTML / milestoneArrNo) - 50;
        } else {
            milestoneWidth = lineWidthHTML / milestoneArrNo;
        }

        // If we've reached the user has just reached the points 
        // threshold, and it hasn't already been reached, push the
        // active milestone HTML
        if ((iPoints / userPointsNew) <= 1 && (iPoints / userPoints) >= 1) {
            renderedMilestoneArr.push(renderTrackerMilestone(milestoneWidth, `${i} ${milestoneArr[i].item}`, milestoneArr[i].img, 'active', iPoints));
            rewardItems.push(milestoneArr[i]);
            console.log(rewardItems);
            console.log(`+1`)
        }
        // If user reached milestone previously, push previously 
        // redeemed milestone HTML
        else if ((iPoints / userPoints) <= 1) {
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
function RenderUserPointsLine() {
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

function initRedeem() {

}

// Load our dialog which displays the great, cool reward dialog which totally didn't take
// me a millenia to get working :)
function RenderDialog(props) {
    // Close our dialogue
    const handleCloseTap = () => {
        props.activeShare(false);
    }
    // Close our dialogue
    const handleRedeemTap = () => {
        props.activeShare(false);
        props.rewardTestShare(false);
    }
    console.log('rendering dialog...')

    console.log(unredeemedLength);
    // Show dialog, and pass buttons to it
    return (
        <>
            <Dialog_HomeReward
                rewards={props.rewards}
            >
                <button className={`btn-txt ${styles['dialog-btn-cancel']}`} onClick={handleCloseTap}>
                    Cancel
                </button>
                <button className={`btn-scnd ${styles['dialog-btn-redeem']}`} onClick={handleRedeemTap}>
                    <img src={imgBtnReward}/>
                    {rewardItemsLength == 1 ? `Redeem` : `Redeem all`}
                </button>
            </Dialog_HomeReward>
        </>
    )
}

function RenderProfileBtn(props) {
    console.log('rendering btn');
    return (
        <ButtonProfile>

        </ButtonProfile>
    )
}

/* 
###############
## Component ##
###############
*/

function DispensePoints() {
    const [isActive, setIsActive] = useState(false);
    const [haveRewards, setHaveRewards] = useState(true);

    //const test = RollingNumber();
    // Navigation here
    const navigate = useNavigate();
    // Dispense btn
    const handleDispenseTap = () => {
        navigate('/dispense0');
    }

    return (
        <>
            {/* <PageTemplate> */}
            <RenderProfileBtn />
            {/* Wrap content */}

            <main id={styles['main']}>
                {/* Main head: User logon message, points */}
                <div id={styles['main-head']}>
                    {/* Points total and rolling text dial to signify new points */}
                    <div id={styles['points-wrapper']}>
                        <div id={styles['points-container']}>
                            <RenderScoreHead/>
                        </div>
                    </div>
                    {/* */}
                    <div className={`hr-vert ${styles['head-divider']}`} style={{ height: '110px', backgroundColor: 'var(--colour-tint-surface4a)' }} />
                    <div id={styles['home-messaging-wrapper']}>
                        <h3>Your skin thanks you, {userName}!</h3>

                        <h5>Have some rewards, on us.</h5>
                    </div>
                </div>

                {/* Points tracking progress counter */}
                <div id={styles['tracker-container']}>
                    {/* Our milestones sit here */}
                    <div id={styles['tracker-milestones-container']}>
                        {/* Insert row of milestones */}
                        <InitTrackerMilestones/>
                    </div>
                    <div id={styles['tracker-baseline-container']}>
                        {/* Baseline base */}
                        <div id={styles['tracker-baseline']}>

                        </div>
                        {/* Baseline active */}
                        <RenderUserPointsLine/>
                    </div>
                </div>
                {/* Reward/dispense buttons */}
                <div id={styles['twin-buttons-container']}>
                    <button
                        className={`btn-xl ${haveRewards ? `active` : `inactive`}`}
                        id={styles['btn-rewards']}
                        onClick={
                            () => 
                            {haveRewards ? 
                                setIsActive(true)
                            : null}
                        }
                        
                    >
                        <div className={styles['btn-lead']}>
                            <img src={imgBtnReward}></img>
                        </div>
                        <p>Redeem <br></br>Rewards</p>
                    </button>

                    {isActive ? 
                        <RenderDialog
                            rewards={rewardItems}
                            active={isActive}
                            activeShare={setIsActive}
                            rewardTest={haveRewards}
                            rewardTestShare={setHaveRewards}
                        />
                    : null }
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
                </div>
            </main>
            {/* </PageTemplate> */}
        </>
    );
}

export default DispensePoints