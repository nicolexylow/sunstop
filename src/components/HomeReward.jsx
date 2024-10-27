import styles from '../scss/modules/HomeReward.module.scss';
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
                            You’ll receive a text to your phone number or email with instructions on how to receive the T-Shirt. 
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

/* 
###############
## Component ##
###############
*/


function HomeRewardDialog ({ rewards, children } ) {
    const rewardsLength = rewards.length

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
        
    }
}

export default HomeRewardDialog