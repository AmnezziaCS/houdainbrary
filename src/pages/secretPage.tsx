import { Fragment, useState } from 'react';

import styles from './secretPage.module.css';

export const SecretPage = () => {
    const [eastereggActivated, setEastereggActivated] = useState(false);

    return (
        <div
            className={`${styles.secretPage} ${eastereggActivated ? styles.easteregg : ''}`}
        >
            <h2>Secret Page</h2>
            {!eastereggActivated && (
                <Fragment>
                    <p>There is nothing to see here.</p>
                    <button
                        onClick={() => setEastereggActivated(true)}
                        className={styles.eastereggButton}
                    >
                        ... ?
                    </button>
                </Fragment>
            )}
            <div className={styles.content}>
                {eastereggActivated && (
                    <div className={styles.bookAnimation}></div>
                )}
            </div>
        </div>
    );
};
