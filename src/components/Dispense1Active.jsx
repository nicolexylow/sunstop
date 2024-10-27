import styles from '../scss/modules/DispenseActive.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import PageTemplate from './PageTemplate';
import { useState } from 'react';

// Imgs
import imgSensorDiagram from '../assets/body/sensor-diagram.png';

// Wizard of Oz control over sunscreen application stage
import Reactotron from "reactotron-react-js"
Reactotron.onCustomCommand({
    command: "test2",
    handler: () => console.log("Test wizardofOz script"),  // Optional settings
    title: "Next dispense", // This shows on the button
    description: "Transition UI to the next sunscreen application body part", // This shows below the button
});

/* 
###############
## Variables ##
###############
*/

// Init figure stuff: function for overall html 
function InitFigure(props) {
    return (
        <>
        <div id={styles['main-left-figure']}>
            <div id={styles['figure-img']}>
                <RenderFigureImg 
                img={props.img}
                />
            </div>
            <div id={styles['figure-labels-list']} style={{ gap: props.gaps }}>
                <RenderFigureLabels 
                body={props.body} 
                bodyTotal={props.bodyTotal}
                bodyNo={props.bodyNo}/>
            </div>
        </div>
        </>
    );
};
// Grab image 
function RenderFigureImg(props) {
    return (
        <>
        <img src={props.img}></img>
        </>
    )
}
// Load from which body part tags we are cycling through
function RenderFigureLabels(props) {
    // Array of label html
    const labelsDOM = [];

    // Loop through the amount of body parts specified
    for (let i=0; i < props.bodyTotal; i++) {
        let labelNum = i + 1;
        // Push body part label to div array
        labelsDOM.push(FigureLabel(labelNum, props.body[i], props.bodyNo))
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
function FigureLabel(num, bodyPart, cBP) {
    // If we're on the current body part, return it as active
    if (cBP == num) {
        return  (
            <>
            <div className={`${styles['label']} ${styles['active']}`} id={num}> 
                <div className={styles['label-text']}>
                    <a>{num}</a> 
                    <p>{bodyPart}</p> 
                </div>
            </div>
            </>
        );
    } else {
        return  (
            <>
            <div className={`${styles['label']}`} id={num}> 
                <div className={styles['label-text']}>
                    <a>{num}</a> 
                    <p>{bodyPart}</p> 
                </div>
            </div>
            </>
        );
    }
};
// Render the right col active head
function RenderActiveBodyPart(props) {
    let reduceIndex = props.index - 1;
    return (
        <>
        <p id={styles['dispense-area']}>{props.activeBodyPart[reduceIndex]}</p>
        </>
    );
};


function DispenseActive() {
    // index tracks which body part we're on
    const [index, setIndex] = useState(1);
    // Extract dispensing template from Dispense page using useLocation
    const location = useLocation();
    const outfitPull = location.state.outfitPush;
    // Extract body parts
    const labelsArr = outfitPull.body;
    const labelsNo = labelsArr.length;
    console.log(outfitPull);
    console.log(labelsArr);
    console.log(labelsNo);

    // Navigation here
    const navigate = useNavigate();
        // Back btn
        const handleBkTap = () => {
            navigate('/dispense0')
        };
        // Log out btn
        const handleLogOutTap = () => {
            navigate('/')
        };
        const handleNextTap = () => {
            if (index == labelsArr.length) {
                navigate('/dispense3_lilmore')
            } else {
                setIndex(index => index + 1);
            }
        };
    
    return (
        <>
        <PageTemplate>
            {/* Wrap content */}
            <main id={styles['main']}>
                {/* H1, sub */}
                <div id={styles['main-head']}>
                    <div id={styles['main-title']}> 
                        <button className="btn-back">
                            <span class="material-symbols-rounded">arrow_back</span>
                        </button>
                        <h1>Dispensing sunscreen</h1>
                    </div>
                </div>
                <div id={styles['wrapper']}>
                    {/* Left col: Body diagram, labels */}
                    <InitFigure
                    img={outfitPull.img}
                    gaps={outfitPull.gaps}
                    body={labelsArr} 
                    bodyTotal={labelsNo}
                    bodyNo={index}> 
                    </InitFigure>
                    {/* Right col: Text, hand fig */}
                    <div id={styles['main-right']}>
                        <div id={styles['right-title']}>
                            <h1>Dispensing sunscreen for</h1>
                            <RenderActiveBodyPart
                            activeBodyPart={labelsArr}
                            index={index}
                            >
                            </RenderActiveBodyPart>
                        </div>
                        <hr className='hr-horiz'></hr>
                        <div id={styles['main-right-diagram']}>
                            <h2>Place hand underneath</h2>
                            <img src={imgSensorDiagram}></img>
                        </div>

                        <button className="btn-scnd" id={styles['btn-skip']} onClick={handleNextTap}>Skip</button>
                    </div>
                </div>
                {/* Ben put your code here */}
            </main>
        </PageTemplate>
        </>
    );
};

export default DispenseActive