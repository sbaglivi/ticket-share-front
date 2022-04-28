import AddressSearchBar from './AddressSearchBar';
import styles from './SellForm.module.css'
import SmallMap from './SmallMap';

const SellForm = () => {
    return (
        <form method="" action="" className={styles.sellForm} >
            <div className={styles.row}>
                <label htmlFor={styles.price}>
                    Price:
                </label>
                <input type='number' name='price' id={styles.price} max='1.25' min='0' step='0.05' required />
            </div>
            <div className={styles.row}>
                <label htmlFor={styles.expireTime}>
                    Expire time:
                </label>
                <input type="text" id={styles.expireTime} placeholder="HH:MM" pattern="([01]?[0-9]|2[0-3]):[0-5][0-9]" required />
            </div>
            <div className={styles.row}>
                <p>Pick the location on the map where you'd like to sell the ticket</p>
                <SmallMap />
                <AddressSearchBar />
            </div>
            <button>Submit</button>
        </form >
    )
}

export default SellForm;