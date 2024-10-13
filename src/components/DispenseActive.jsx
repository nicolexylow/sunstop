import styles from '../scss/modules/DispenseActive.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';

// Wizard of Oz control over sunscreen application stage
import Reactotron from "reactotron-react-js"
Reactotron.onCustomCommand({
    command: "test2",
    handler: () => console.log("Test wizardofOz script"),  // Optional settings
    title: "Next dispense", // This shows on the button
    description: "Transition UI to the next sunscreen application body part", // This shows below the button
});

// Init figure stuff: function for overall html 
function InitFigure(props) {
    return (
        <>
            <div id={styles['main-left-figure']}>
                <div id={styles['figure-img']}>
                    <RenderFigureImg img={props.outfit.img}/>
                </div>
                <div id={styles['figure-labels-list']}>
                    <RenderFigureLabels body={props.outfit.body}/>
                </div>
            </div>
        </>
    );
};
// Grab image 
function RenderFigureImg(props) {

}
// Load from which body part tags we are cycling through
function RenderFigureLabels(props) {
    // Extract variables for body parts
    const labelsArr = props.body;
    const labelsNo = labelsArr.length;
    console.log(labelsArr);
    console.log(labelsNo);

    // Array of label html
    const labelsDOM = [];

    // Loop through the amount of body parts specified
    for (let i=0; i < labelsNo; i++) {
        // Push body part label to div array
        labelsDOM.push(FigureLabel(i, labelsArr[i]))
    };
    console.log(labelsDOM);

    // Return label html array
    return (
        <>
            {labelsDOM}
        </>
    );
};
// HTML for body part label
function FigureLabel(num, bodyPart) {
    // Return our body part label, number and name
    return  <div className={styles['label']} id={num}> 
                <a>{num}.</a> 
                <p>{bodyPart}</p> 
            </div>;
};

function DispenseActive() {
    // Extract variables for body parts from Dispense page using useLocation
    const location = useLocation();
    const outfitPull = location.state.outfitPush;
    console.log(outfitPull);

    // Navigation here
    const navigate = useNavigate();
        // Back btn
        // We need another page instead of going back to dispense. Maybe dashboard page?
        // If we allow the user to go back all the time, they can dispense infinite sunscreen
        // and exploit our free sunscreen functions.
        const handleBkTap = () => {
            navigate('/dispense')
        };
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
                {/* Left col: Body diagram, labels */}
                <InitFigure outfit={outfitPull}/>
                {/* Right col: Text, hand fig */}
                <div id={styles['main-right']}>
                    <div id={styles['right-title']}>
                        <h1>Dispensing sunscreen for</h1>
                        <p id={styles['dispense-area']}>Face</p>
                        <h2>Place hand under</h2>
                    </div>
                    <button className="btn-scnd" id={styles['btn-skip']}>Skip</button>
                </div>
                {/* Ben put your code here */}
            </main>
        </div>
        </>
    );
};


export default DispenseActive