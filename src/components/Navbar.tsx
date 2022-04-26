import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
    return (
        <header className={styles.header}>
            <nav>
                <Link to='/'>Home</Link>
                <div className={styles.otherLinks}>
                <Link to='/sell'>Sell</Link>
                <Link to='/buy'>Buy</Link>
                </div>
            </nav>
        </header>
    )
}

export default Navbar;