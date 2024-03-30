import { Link } from 'react-router-dom';

import styles from './header.module.css';

export const Header = () => {
    return (
        <header className={styles.header}>
            <h1 className={styles.logo}>HoudainBrary</h1>
            <nav>
                <ul className={styles.navList}>
                    <li className={styles.navItem}>
                        <Link to="/" className={styles.navLink}>
                            Homepage
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link to="/books" className={styles.navLink}>
                            Books
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link to="/authors" className={styles.navLink}>
                            Authors
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};
