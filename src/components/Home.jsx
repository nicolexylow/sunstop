import styles from '../scss/modules/Home.module.scss';
import { useNavigate, useLocation } from 'react-router-dom';
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
    if (props.gainedPoints != 0) {
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
    } else {
        return (
            <>
                <div id={styles['points-total-container']}>
                    <h4>Total points</h4>
                    {props.userPoints}
                </div>
            </>
        )
    }
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
            milestoneWidth = 220;
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
    let trackLineWidth;
    if (props.userDetails.points < 200 )
        trackLineWidth = props.userDetails.points
    else {
        trackLineWidth = props.userDetails.points -20;
    }

    return (
        <>
            <div id={styles['tracker-baseline']} className={styles['active']} style={{ width: trackLineWidth }}>
            </div>
        </>
    )
};

// Load our dialog which displays the great, cool reward dialog which totally didn't take
// me a millenia to get working :)
function RenderDialog(props) {
    console.log(props.currentUser.rewards);
    let poo = Object.keys(props.currentUser.rewards);
    let newRewardsArr = [];

    useEffect(() => {
        Object.values(props.currentUser.rewards).forEach(function(val,index) {
            console.log(poo[index]);
            // Maths: if the user has just reached the points threshold, and it hasn't already been reached, make reward active
            if ( val !== 'default' ) {
                newRewardsArr.push(milestoneArr[index])
                console.log(props.localRewards);
            };
            props.setLocalRewards(newRewardsArr);
        });
    }, [props.currentUser.rewards]);
    
    console.log('rendering dialog...')
    
    // Show dialog, and pass buttons to it
    return (
        <>
            <Dialog_HomeReward
                rewards={props.localRewards}
                setRewards={props.setLocalRewards}
                activeShare={props.activeShare}
                redeemRenderShare={props.redeemRenderShare}
            >
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
            [key]: val
        }));
    }
}

// Handle updates to rewards based on gained points, only called if gained points
function initRewards( currentUser, setCurrentUser, newPoints, setHaveRewards, setNewPoints, gainedPoints ) {
    console.log(newPoints + gainedPoints);
    console.log(currentUser.points);
    const updatedPoints = newPoints + gainedPoints;
    // Double check if we actually have new points
    if (currentUser.points != updatedPoints) {
        // Run check for each reward
        Object.values(currentUser.rewards).forEach(function(val,index) {
            const threshold=milestoneArr[index].threshold
            // Copy rewards object to edit
            const newRewardsObj = currentUser.rewards;
            // Maths: if the user has just reached the points threshold, and it hasn't already been reached, make reward active
            if ( val == 'default' && (threshold / updatedPoints) <= 1 && (threshold / updatedPoints) >= 1) {
                // Find old actives and make them active-past 
                Object.values(currentUser.rewards).forEach(function(val,index) {
                    if ( val == 'active' ) {
                        updateCurrentUser(setCurrentUser, milestoneArr[index].item, 'active-past', 'UpdateReward');
                    };
                });
                updateCurrentUser(setCurrentUser, milestoneArr[index].item, 'active', 'UpdateReward');
                setHaveRewards(true);
            }
        });
        Object.values(currentUser.rewards).forEach(function(val,index) { 
            if ( val == 'active' || val == 'active-past' ) {
                console.log(val);
                setHaveRewards(true);
            };
        });
    }
    setNewPoints( newPoints + gainedPoints)
}

/* 
###############
## Component ##
###############
*/

function Home( ) {
    // Grab gained points, if applicable
    const location = useLocation();
    // Navigation here
    const navigate = useNavigate();

    // Setup users' details
    // Context for current user
    const { currentUser, setCurrentUser, currentUserId, setCurrentUserId, emptyUser } = useContext(AuthContext); console.log(currentUser);

    // Points
    const oldPoints = currentUser.points
    const [ newPoints, setNewPoints ] = useState(oldPoints);
    
    // Do we got rewards, to change btn state
    const [ haveRewards, setHaveRewards ] = useState(false);

    console.log(oldPoints);

    let gainedPoints = 0;
    console.log(location.state);
    if (location.state !== null) {
        gainedPoints=location.state.pointsGained;
    }
    const renderedPoints = oldPoints + gainedPoints;

    useEffect(() => {
        console.log(location.state);
        if (location.state !== null) {
            initRewards( currentUser, setCurrentUser, newPoints, setHaveRewards, setNewPoints, gainedPoints );
        }
    }, []);

    console.log(haveRewards)
    // Click redeem btn opens redeem dialog
    const [ isActive, setIsActive ] = useState(false);
    // Local rewards handling
    const [ rewards, setRewards ] = useState([]);
    
    // Dispense btn
    const handleDispenseTap = () => {
        navigate('/dispense0');
    }

    console.log(newPoints);
    useEffect(() => {
        updateCurrentUser( setCurrentUser, 'points', newPoints);
    }, [newPoints]);
    console.log(newPoints);


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
                            <RenderScoreHead userPoints={renderedPoints} gainedPoints={gainedPoints}/>
                        </div>
                    </div>
                    {/* */}
                    <div className={`hr-vert ${styles['head-divider']}`} style={{ height: '110px', backgroundColor: 'var(--colour-tint-surface4a)' }} />
                    <div id={styles['home-messaging-wrapper']}>
                        {haveRewards ? 
                            <h3> Your skin thanks you, {currentUser.name}!</h3>
                        :   <h3> Welcome, {currentUser.name}!</h3> 
                        }
                        {haveRewards ? 
                            <h5> Have some rewards, on us.</h5>
                        :   null
                        }
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
                            currentUser={currentUser}
                            active={isActive}
                            activeShare={setIsActive}
                            redeemRenderShare={setHaveRewards}
                            localRewards={rewards}
                            setLocalRewards={setRewards}
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