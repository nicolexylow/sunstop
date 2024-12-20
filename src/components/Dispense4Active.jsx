//import PageTemplate from "./PageTemplate";
import { useNavigate } from 'react-router-dom'
import styles from '../scss/modules/Dispense4Active.module.scss';
import ButtonProfile from './ButtonProfile';

import handSensor from '../assets/hand_sensor.png'; 

function RenderProfileBtn(props) {
    console.log('rendering btn');
    return (
        <ButtonProfile>

        </ButtonProfile>
    )
}

function Dispense4Active() {
    const navigate = useNavigate();

    const pointsGained = 20;

    const handleSkip = () => {
        navigate('/home', { state: { pointsGained } });
    }

    return (
        <>
        <RenderProfileBtn />
        {/* <PageTemplate> */}
            <div className="main-container">
                <div className={styles['content-container']}>
                    <h1 className={styles['heading']}>Dispensing a little more sunscreen</h1>

                    <div className="illustration-container">
                        <p className={styles['prompt']}>Place hand under</p>
                        <img className={styles['hand-sensor-img']} src={handSensor} alt="Hand Sensor Prompt" />
                    </div>

                    <button className={`btn-scnd ${styles['skip-button']}`} onClick={handleSkip}>Skip</button>
                </div>
            </div>

        {/* </PageTemplate> */}
        </>
    );
}

export default Dispense4Active