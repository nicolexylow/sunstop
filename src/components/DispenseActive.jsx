import styles from '../scss/modules/DispenseActive.module.scss';

function DispenseActive() {
    return (
        <>
        {/* Wrap content */}
        <div id='wrapper'>
            {/* Header: Back btn, indexical title, logout */}
            <header>
                <button class="btn-back"><span class={`material-symbols-rounded`}>arrow_back</span></button>
                <button class="btn-logout">Log out</button>
            </header>

            <main>
                {/* Left col: Body diagram, labels  */}
                <div id={styles['main-left-figure']}>
                    <div id={styles['figure-img']}></div>
                    <div id={styles['figure-labels-list']}>
                        <div class={styles['label']}> <a>1.</a> <p>Face</p> </div>
                        <div class={styles['label']}> <a>2.</a> <p>Arms</p> </div>
                    </div>
                </div>
                {/* Right col: Text, hand fig */}
                <div id={styles['main-right']}>
                    <div id={styles['right-title']}>
                        <h1>Dispensing sunscreen for</h1>
                        <p id={styles['dispense-area']}>Face</p>
                        <h2>Place hand under</h2>
                    </div>
                    <button class="btn-scnd" id={styles['btn-skip']}>Skip</button>
                </div>
                {/* Ben put your code here */}
            </main>
        </div>
        </>
    );
}

export default DispenseActive