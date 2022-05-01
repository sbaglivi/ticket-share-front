import styles from './SellForm.module.css'
import SmallMap from './SmallMap';
import { useState } from 'react';
const SellForm = () => {
    let [coordinates, setCoordinates] = useState([NaN, NaN])
    return (
        <form method="POST" action="http://localhost:5000/ticket" className={styles.sellForm} id='sellForm'>
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
                <input type="text" name='expireTime' id={styles.expireTime} placeholder="HH:MM" pattern="([01]?[0-9]|2[0-3]):[0-5][0-9]" required />
            </div>
            <p>Pick the location on the map where you'd like to sell the ticket</p>
            <div className={`${styles.row} ${styles.mapDiv}`}>
                <SmallMap setCoordinates={setCoordinates} />
                <input type='number' step='any' id='latitude' placeholder='latitude' name='latitude' className={styles.latitude} readOnly value={coordinates[0]} required min='-180' max='180' />
                <input type='number' step='any' id='longitude' placeholder='longitude' name='longitude' className={styles.longitude} readOnly value={coordinates[1]} required min='-85' max='85' />
            </div>

            <button>Submit</button>
        </form >
    )
}

export default SellForm;