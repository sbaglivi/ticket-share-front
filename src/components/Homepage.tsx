import styles from './Homepage.module.css';
import { Link } from 'react-router-dom';
const Homepage = () => {
    return (
        <div className={styles.page}>
            <div className={styles.landing}>
                <Link to='/sell' className={styles.links}><div className={`${styles.column} ${styles.sell}`}>Sell</div></Link>
                <Link to='/buy' className={styles.links}><div className={`${styles.column} ${styles.buy}`}>Buy</div></Link>
            </div>
        </div>
    )
}

export default Homepage;