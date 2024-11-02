import styles from '../scss/modules/ButtonProfile.module.scss';

function ButtonProfile( { rewards, children } ) {
    const handleClickProfile= () => {

    }

    return (
        <button className={`btn-scnd ${styles['profile']}`} onClick={handleClickProfile}>
            <span className={`material-symbols-rounded`}>account_circle</span>
            <p>Profile</p>
        </button>
    )
}

export default ButtonProfile