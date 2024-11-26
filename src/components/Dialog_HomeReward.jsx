import styles from '../scss/modules/Dialog_HomeReward.module.scss';
import { useContext, useEffect } from 'react';
import { AuthContext } from './_AuthContext';

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


/* 
###########
## Props ##
###########
*/

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

function RenderDialogSingle (props) {

    // Individual reward clicky
    const handleRewardClick = () => {
        navigate('/');
    };
    // Close our dialogue
    const handleCloseTap = () => {
        props.activeShare(false);
    }
    // Close our dialogue
    const handleRedeemTap = () => {
        updateCurrentUser(props.setCurrentUser, props.rewards.item, 'redeemed', 'UpdateReward');

        props.activeShare(false);
        props.redeemRenderShare(false);
    }

    return (
        <>
        <dialog>
            <div className='dialog-container'>
                <div className={styles['head-container']}>
                    <h1>Redeem reward</h1>
                </div>
                <div className='content-container'>
                    <div className={styles['reward-wrapper']}>
                        <img className={styles['reward-img']} src={props.rewards.img}></img>
                        <h3 className={styles['reward-title']}>{props.rewards.title}</h3>
                    </div>
                    <div>
                        <p className={styles['desc-text']}>
                            Redeem below to get a message to your phone/email with instructions on how to receive your item. 
                        </p>
                    </div>
                </div>
                <div className='btns-container'>
                    <button className={`btn-txt ${styles['dialog-btn-cancel']}`} onClick={handleCloseTap}>
                        Cancel
                    </button>
                    <button className={`btn-prmry ${styles['dialog-btn-redeem']}`} onClick={handleRedeemTap}>
                        <img src={imgBtnReward}/>
                        Redeem All
                    </button>
                </div>
            </div>
        </dialog>
        </>
    );
}

function RenderDialogMulti (props) {
    const rewardsLength = props.rewards.length;  

    // Individual reward clicky
    const handleRewardClick = () => {
        RenderDialogSingle();
    };
    // Close our dialogue
    const handleCloseTap = () => {
        props.activeShare(false);
    }
    // Close our dialogue
    const handleRedeemTap = () => {
        for (let i = 0; i < rewardsLength; i++) {
            updateCurrentUser(props.setCurrentUser, props.rewards[i].item, 'redeemed', 'UpdateReward');
        }   

        props.activeShare(false);
        props.redeemRenderShare(false);
    }

    const RenderRewardListing = (reward) => {
        return (
            <>
            <button className='rewards-listing-wrapper'>
                <div className='listing-img-border'>
                    <img src={reward.img}></img>
                </div>
                <div className='listing-info-trail'>
                    <h4>{reward.title}</h4>
                    <span class="material-symbols-rounded">chevron_right</span>
                </div>
            </button>
            </>
        )
    }

    const RenderRewards = () => {
        const rewardsDOM = [];
        for ( let i = 0; i < rewardsLength; i ++ ) {
            rewardsDOM.push(RenderRewardListing(props.rewards[i]));
        }
        return (
            <>
                {rewardsDOM}
            </>
        )
    }

    return (
        <>
        <dialog>
            <div className={`dialog-container ${styles['reward-dialog-container']}`}>
                <div className={styles['head-container']}>
                    <h1>Redeem rewards</h1>
                    <p>You have multiple outstanding items to redeem.</p>
                </div>
                <div className='content-container'>
                    <div className='rewards-list-container'>
                        <RenderRewards/>
                    </div>
                    <div>
                        {/* 
                            <p className={styles['desc-text']}>
                                Redeem below to get a message to your phone/email with instructions on how to receive your items. 
                            </p>
                        */}
                    </div>
                </div>
                <div className='btns-container'>
                    <button className={`btn-txt ${styles['dialog-btn-cancel']}`} onClick={handleCloseTap}>
                        Cancel
                    </button>
                    <button className={`btn-prmry ${styles['dialog-btn-redeem']}`} onClick={handleRedeemTap}>
                        <img src={imgBtnReward}/>
                        Redeem All
                    </button>
                </div>
            </div>
        </dialog>
        </>
    );
}

/* 
###############
## Component ##
###############
*/


function Dialog_HomeReward ( props ) {
    console.log(props);
    const { currentUser, setCurrentUser, currentUserId, setCurrentUserId } = useContext(AuthContext);

    const rewardsLength = props.rewards.length
    console.log(props.rewards)

    // If we've only got one unredeemed reward, just return regular
    // single-reward dialog
    if (rewardsLength == 1) {
        return (
            <RenderDialogSingle
            rewards={props.rewards[0]}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            activeShare={props.activeShare}
            redeemRenderShare={props.redeemRenderShare}
            />
        )
    } else {
        return (
            <RenderDialogMulti
            rewards={props.rewards}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            activeShare={props.activeShare}
            redeemRenderShare={props.redeemRenderShare}
            />

        )
    }
}

export default Dialog_HomeReward