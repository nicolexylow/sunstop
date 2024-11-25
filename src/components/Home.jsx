import styles from '../scss/modules/Home.module.scss';
import { useNavigate } from 'react-router-dom';
import { RollingNumber } from '@layflags/rolling-number';
import Dialog_HomeReward from './Dialog_HomeReward';
import ButtonProfile from './ButtonProfile';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from './_AuthContext';
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

// This season's milestones
const milestoneArr = [
    { item: 'shirt1', img: imgReward1, title: 'Sunstop T-Shirt', threshold: 200 },
    { item: 'hat2', img: imgReward2, title: 'Sunstop Hat', threshold: 400 },
    { item: 'sung3', img: imgReward3, title: 'Sunstop Sunglasses', threshold: 600 },
    { item: 'jump4', img: imgReward4, title: 'Sunstop Jumper', threshold: 800 }
];

/* USER POINTS */
// Total width of line container in html
const lineWidthHTML = 1000;


/* 
###########
## Props ##
###########
*/

// User total points
function RenderScoreHead( props ) {
    console.log(props.userPoints);
    return (
        <>
            <div id={styles['points-total-container']}>
                <h4>Total points</h4>
                <layflags-rolling-number className={styles['points-total-dial']}>
                    {props.userPoints}
                </layflags-rolling-number>
            </div>
            <h1 className={styles['points-gained']}>+{props.gainedPoints}</h1>
        </>
    )
}

// Milestone tracker stuff
function InitTrackerMilestones( props ) {
    const milestoneArrLen = milestoneArr.length;
    // Length is total width of tracker line divided by total milestones
    let milestoneWidth = lineWidthHTML / milestoneArrLen;
    console.log(milestoneWidth)

    // Init HTML array for rewards
    const renderedMilestoneArr = [];

    // Pushing HTML elements to array
    for (let i = 0; i < milestoneArrLen; i++) {
        // Multiply i by 200 to get reward tracker steps (we get a reward every 200 pts)
        const key = milestoneArr[i].item;

        // Make first milestone a bit shorter
        
        if (i == 0) {
            milestoneWidth = (lineWidthHTML / milestoneArrLen) - 50;
        } else {
            milestoneWidth = lineWidthHTML / milestoneArrLen;
        } 

        // Add each milestone to html array
        renderedMilestoneArr.push(
            renderTrackerMilestone(
                milestoneWidth, 
                `${key}`, 
                milestoneArr[i].img, 
                milestoneArr[i].threshold, // points required label
                props.userDetails.rewards, // reward state for class
            )
        );
    };

    return (
        <>
            {renderedMilestoneArr}
        </>
    );
}
function renderTrackerMilestone(lineWidthHTML, item, img, pointsRequired, rewardStates) {
    return (
        <>
            {/* Wrap milestone elements */}
            <div className={`${styles['milestone']} ${styles[rewardStates[item]]}`} key={item} style={{ width: lineWidthHTML }}>
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
};

// Update user points on head and tracker
function initUserPointsUpdate() {

};
function renderUserPointsUpdate() {

};
function RenderUserPointsLine( props ) {
    // Calculate line width based on user points/points max
    // For now, points are the same as max line width
    let trackLineWidth = props.userDetails.points;

    return (
        <>
            <div id={styles['tracker-baseline']} className={styles['active']} style={{ width: trackLineWidth }}>
            </div>
        </>
    )
};
function initReward() {

};

function initRedeem() {

};

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

const updateCurrentUser = (setState, key, val, reward) => {
    // If we're updating a reward (true/false), use different syntax
    if(reward == 'UpdateReward') {
        setState(prevState => ({
            ...prevState,
            rewards: {...prevState.rewards, [key]: val}
        }));
    } else {
        setState(prevState => ({
            ...prevState,
            key: val
        }));
    }
}

// Handle updates to rewards based on gained points
function initNewRewards( currentUser, setCurrentUser, oldPoints, newPoints ) {
    // Run check for each reward
    Object.values(currentUser.rewards).forEach(function(val,index) {
        const threshold=milestoneArr[index].threshold
        // Copy rewards object to edit
        const newRewardsObj = currentUser.rewards;
        // Maths: if the user has just reached the points threshold, and it hasn't already been reached, make reward active
        if ( val == 'default' && (threshold / newPoints) <= 1 && (threshold / oldPoints) >= 1) {
            console
            updateCurrentUser(setCurrentUser, milestoneArr[index].item, 'active', 'UpdateReward');
        }
    });
}
function renderNewRewards( props ) {

}

/* 
###############
## Component ##
###############
*/

function Home( props ) {
    // Setup users' details
    // Context for current user
    const { currentUser, setCurrentUser, currentUserId, setCurrentUserId, emptyUser } = useContext(AuthContext); console.log(currentUser);

    console.log(typeof currentUser == 'undefined')
    if ( typeof currentUser == 'undefined' ) {
        const existingSignUpList = store.get('signUpList');
        setCurrentUser(existingSignUpList.devUser);
        console.log(existingSignUpList.devUser)
        setCurrentUserId('devUser')
        console.log(currentUser);
    }

    /*
    useEffect(() => {
        setCurrentUser(prevState => ({
            ...prevState,
            name: 'foo'
        }));
        console.log(currentUser);
    }, []); */

    // Points
    const gainedPoints = 20;
    const oldPoints = currentUser.points;
    const [ newPoints, setNewPoints ] = useState(oldPoints + gainedPoints);


    // Set new points from sunscreen dispense page
    useEffect(() => {

    }, []);

    // Do we got rewards, to change btn state
    const [ haveRewards, setHaveRewards ] = useState(true);
    // Click redeem btn opens redeem dialog
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        initNewRewards( currentUser, setCurrentUser, oldPoints, newPoints );
    }, []);

    // Navigation here
    const navigate = useNavigate();
    // Dispense btn
    const handleDispenseTap = () => {
        navigate('/dispense0');
    }

    return (
        <>
            {/* Profile btn*/}
            <ButtonProfile/>

            {/* Wrap content */}
            <main id={styles['main']}>
                {/* Main head: User logon message, points */}
                <div id={styles['main-head']}>
                    {/* Points total and rolling text dial to signify new points */}
                    <div id={styles['points-wrapper']}>
                        <div id={styles['points-container']}>
                            <RenderScoreHead userPoints={newPoints} gainedPoints={gainedPoints}/>
                        </div>
                    </div>
                    {/* */}
                    <div className={`hr-vert ${styles['head-divider']}`} style={{ height: '110px', backgroundColor: 'var(--colour-tint-surface4a)' }} />
                    <div id={styles['home-messaging-wrapper']}>
                        <h3>Your skin thanks you, {currentUser.name}!</h3>

                        <h5>Have some rewards, on us.</h5>
                    </div>
                </div>

                {/* Points tracking progress counter */}
                <div id={styles['tracker-container']}>
                    {/* Our milestones sit here */}
                    <div id={styles['tracker-milestones-container']}>
                        {/* Insert row of milestones */}
                        <InitTrackerMilestones userDetails={currentUser}/>
                    </div>
                    <div id={styles['tracker-baseline-container']}>
                        {/* Baseline base */}
                        <div id={styles['tracker-baseline']}/>
                        {/* Baseline active */}
                        <RenderUserPointsLine userDetails={currentUser}/>
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
        </>
    );
}

export default Home