import styles from '../scss/modules/Dispense.module.scss';

function Dispense() {
    return (
        <>
        {/* Wrap content */}
        <div id='wrapper'>
            {/* Header: Back btn, indexical title, logout */}
            <header>
                <button className="btn-back"><span className={`material-symbols-rounded`}>arrow_back</span></button>
                <button className="btn-logout">Log out</button>
            </header>

            <main>
                {/* Main head: User logon message, points */}
                <div id={styles['main-head']}>
                    <h3>Welcome Chris</h3>
                    <p>0 points</p>
                </div>
                {/* H1, sub */}
                <div>
                <h1>How much sunscreen is needed?</h1>
                <h2>Select what you are wearing</h2>
                </div>
                {/* Cards carousel:  */}
                <div id={styles['main-cards']}>
                    <div className={styles["card-body"]}>
                        <h2>Beach</h2>
                    </div>
                    <div className={styles["card-body"]}>
                        <h2>Office</h2>
                    </div>
                    <div className={styles["card-body"]}>
                        <h2>Casual</h2>
                    </div>
                    <div className={styles["card-body"]}>
                        <h2>Casual</h2>
                    </div>
                </div>
                {/* Ben put your code here */}
            </main>
        </div>
        </>
    );
}

export default Dispense