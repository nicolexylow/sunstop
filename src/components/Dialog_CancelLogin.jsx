import styles from '../scss/modules/Dialog_CancelLogin.module.scss';
import { useState, useEffect, useRef } from 'react';


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
function RenderDialogSingle ({ rewards, children }) {
    return (
        <>
        <dialog>
            <div className='dialog-container'>
                <div className={styles['head-container']}>
                    <h1>Redeem reward</h1>
                </div>
                <div className='content-container'>
                    <div className={styles['reward-wrapper']}>
                        <img className={styles['reward-img']} src={rewards.img}></img>
                        <h3 className={styles['reward-title']}>{rewards.title}</h3>
                    </div>
                    <div>
                        <p className={styles['desc-text']}>
                            Redeem below to get a message to your phone/email with instructions on how to receive your item. 
                        </p>
                    </div>
                </div>
                <div className='btns-container'>
                    {children}
                </div>
            </div>
        </dialog>
        </>
    );
}

function RenderDialogMulti ({ rewards, children }) {
    const rewardsLength = rewards.length;  

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
            rewardsDOM.push(RenderRewardListing(rewards[i]));
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
            <div className='dialog-container'>
                <div className={styles['head-container']}>
                    <h1>Redeem rewards</h1>
                    <p>You have multiple outstanding items to redeem. Open one from the list, or redeem all.</p>
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
                    {children}
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


function Dialog_CancelLogin ( { rewards, children } ) {

    const rewardsLength = rewards.length
    console.log(rewards)

    // If we've only got one unredeemed reward, just return regular
    // single-reward dialog
    if (rewardsLength == 1) {
        return (
            <RenderDialogSingle
            rewards={rewards[0]}
            >
                {children}
            </RenderDialogSingle>
        )
    } else {
        return (
            <RenderDialogMulti
            rewards={rewards}
            >
                {children}
            </RenderDialogMulti>
        )
    }
}

export default Dialog_CancelLogin