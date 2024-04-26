import { useEffect, useState } from 'react';

import { OPEN_LIBRARY_URL_PREFIX } from '../utils/utils';
import styles from './homePage.module.css';

type Change = {
    timestamp: string;
    comment: string;
    author: {
        key: string;
    } | null;
};

export const HomePage = () => {
    const [recentChanges, setRecentChanges] = useState<Change[]>([]);

    useEffect(() => {
        fetchRecentChanges();
    }, []);

    const fetchRecentChanges = async () => {
        try {
            const response = await fetch(
                `${OPEN_LIBRARY_URL_PREFIX}/recentchanges.json?limit=5&bot=false`,
            );
            if (!response.ok) {
                throw new Error('Failed to fetch recent changes');
            }
            const data: Change[] = await response.json();

            setRecentChanges(data);
        } catch (error) {
            console.error('Error fetching recent changes:', error);
        }
    };

    return (
        <div className={styles.homePage}>
            <h1 className={styles.title}>Welcome to HoudainBrary</h1>
            <h2 className={styles.subtitle}>Recent Document Changes:</h2>
            <ul className={styles.recentChangesList}>
                {recentChanges.map((change, index) => (
                    <li key={index} className={styles.changeItem}>
                        <span className={styles.timestamp}>
                            {change.timestamp}
                        </span>
                        <span className={styles.comment}>{change.comment}</span>
                        {change.author ? (
                            <span className={styles.author}>
                                Author: {change.author.key}
                            </span>
                        ) : null}
                    </li>
                ))}
            </ul>
        </div>
    );
};
