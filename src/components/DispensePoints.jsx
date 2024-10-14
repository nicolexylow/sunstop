import styles from '../scss/modules/DispensePoints.module.scss';
import { useNavigate } from 'react-router-dom';
import { RollingNumber } from '@layflags/rolling-number';

function InitTrackerMilestones() {
    return RenderTrackerMilestone();
}
function RenderTrackerMilestone() {

    return (
        <>
            {/* Wrap milestone elements */}
            <div className={styles['milestone']}>
                {/* Icon w/ img */}
                <div className={styles['milestone-icon']}>

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
\        {/* Wrap content */}
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
                        <h1 id={styles['points-total']}>10</h1>
                        <div className={styles['points-dial-container']}>                    
                            <layflags-rolling-number className={styles['points-dial']}>123</layflags-rolling-number>
                        </div>
                    </div>
                </div>
                
                {/* Points tracking progress counter */}
                <div id={styles['tracker-container']}>
                    {/* Our milestones sit here */}
                    <div id={styles['tracker-milestones-container']}>
                        {/* Insert row of milestones */}
                        {/* Temporarily, insert two */}
                        {InitTrackerMilestones()}
                        {InitTrackerMilestones()}
                    </div>
                    {/* Baseline */}
                    <div id={styles['tracker-baseline']}>

                    </div>
                </div>
                {/* Ben put your code here */}
            </main>
        </div>
        </>
    );
}

export default DispensePoints