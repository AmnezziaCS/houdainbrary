import { Link } from 'react-router-dom';

import styles from './notFoundPage.module.css';

export const NotFoundPage = () => {
    return (
        <div className={styles.container}>
            <img
                src={`${process.env.PUBLIC_URL}/images/notFound.jpg`}
                alt="404 Not Found"
                className={styles.images}
            />
            <Link to="/">Go to Home Page</Link>
        </div>
    );
};
