import { useState } from 'react';
import { Link } from 'react-router-dom';

import { ShowSearchResultsObj } from '../Pages/root';
import { OPEN_LIBRARY_URL_PREFIX } from '../utils/utils';
import styles from './header.module.css';

type SearchResult = {
    title: string;
    isbn: string[];
};

export const Header = ({
    showSearchResults,
    setShowSearchResults,
}: {
    showSearchResults: ShowSearchResultsObj;
    setShowSearchResults: React.Dispatch<
        React.SetStateAction<ShowSearchResultsObj>
    >;
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query);

        if (!query) {
            setSearchResults([]);
            setShowSearchResults({
                isQuerying: false,
                isLoading: false,
            });
        }
        if (query.length < 3) {
            return;
        }
    };

    const handleSearchButtonClick = () => {
        if (searchQuery.length >= 3) {
            setShowSearchResults({
                isQuerying: true,
                isLoading: true,
            });

            fetch(
                `${OPEN_LIBRARY_URL_PREFIX}/search.json?q=${searchQuery}&fields=title,isbn&limit=5`,
            )
                .then((response) => response.json())
                .then((data) => {
                    setSearchResults(data.docs);
                    setShowSearchResults({
                        isQuerying: true,
                        isLoading: false,
                    });
                })
                .catch((error) => {
                    console.error('Error fetching search results:', error);
                });
        }
    };

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
                        <Link to="/search" className={styles.navLink}>
                            Advanced search
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link to="/settings" className={styles.navLink}>
                            Settings
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            handleSearchButtonClick();
                        }
                    }}
                    placeholder="Search Books..."
                    className={styles.searchInput}
                />
                <button
                    onClick={handleSearchButtonClick}
                    className={styles.searchButton}
                >
                    Search
                </button>
                <div
                    className={`${styles.searchResults} ${
                        showSearchResults.isQuerying ? styles.active : ''
                    }`}
                >
                    {showSearchResults.isLoading ? (
                        <p className={styles.searchResultLoading}>Loading...</p>
                    ) : searchResults.length > 0 &&
                      !showSearchResults.isLoading ? (
                        searchResults.map((result) => (
                            <Link
                                key={result.isbn[0]}
                                to={`/books/${result.isbn[0]}`}
                                className={styles.searchResult}
                            >
                                {result.title}
                            </Link>
                        ))
                    ) : (
                        <p className={styles.searchResultNoMatches}>
                            No results found
                        </p>
                    )}
                </div>
            </div>
        </header>
    );
};
