import styles from '../scss/modules/DispenseActive.module.scss';

function DispenseActive() {
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
                {/* Left col: Body diagram:  */}
                <div id={styles['main-figure']}>

                </div>
                {/* Right col: Text, hand fig */}
                <div>
                <h1>How much sunscreen is needed?</h1>
                <h2>Select what you are wearing</h2>
                </div>
                {/* Ben put your code here */}
            </main>
        </div>
        </>
    );
}

export default DispenseActive