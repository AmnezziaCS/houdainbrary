import { useState } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';

import { SearchResult } from '../utils/types';
import { OPEN_LIBRARY_URL_PREFIX } from '../utils/utils';
import styles from './searchPage.module.css';

const SearchResultLink = ({ result }: { result: SearchResult }) => (
    <Link to={`/books/${result.isbn[0]}`} className={styles.searchResult}>
        {result.title}
    </Link>
);

export const SearchPage = () => {
    const [searchParams, setSearchParams] = useState({
        title: '',
        author: '',
        subject: '',
        language: [''],
        publish_year_start: '',
        publish_year_end: '',
    });
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchPerformed, setSearchPerformed] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setSearchParams({ ...searchParams, [name]: value });
    };

    const handleSearchButtonClick = () => {
        setSearchPerformed(true);
        setIsLoading(true);
        const {
            title,
            author,
            subject,
            language,
            publish_year_start,
            publish_year_end,
        } = searchParams;

        const queryParameters = {
            ...(title ? { title } : {}),
            ...(author ? { author } : {}),
            ...(subject ? { subject } : {}),
            ...(language ? { language: language.join(',') } : {}),
            ...(publish_year_start && publish_year_end
                ? {
                      publish_year: `[${publish_year_start} TO ${publish_year_end}]`,
                  }
                : {}),
            fields: 'title,isbn',
            limit: '10',
        };
        const queryString = new URLSearchParams(queryParameters).toString();

        window.history.replaceState(
            null,
            '',
            `${window.location.pathname}?${queryString}`,
        );

        fetch(`${OPEN_LIBRARY_URL_PREFIX}/search.json?${queryString}`)
            .then((response) => response.json())
            .then((data) => {
                setSearchResults(
                    data.docs.filter(
                        (doc: SearchResult) => doc.isbn && doc.title,
                    ),
                );
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching search results:', error);
                setIsLoading(false);
            });
    };

    const languageOptions = [
        { value: 'mul', label: 'Multiple Languages' },
        { value: 'und', label: 'Undetermined' },
        { value: 'eng', label: 'English' },
        { value: 'spa', label: 'Spanish' },
        { value: 'fre', label: 'French' },
        { value: 'ger', label: 'German' },
        { value: 'ita', label: 'Italian' },
        { value: 'por', label: 'Portuguese' },
        { value: 'jpn', label: 'Japanese' },
        { value: 'chi', label: 'Chinese' },
        { value: 'rus', label: 'Russian' },
        { value: 'ara', label: 'Arabic' },
        { value: 'hin', label: 'Hindi' },
        { value: 'kor', label: 'Korean' },
        { value: 'nld', label: 'Dutch' },
    ];

    return (
        <div className={styles.searchPage}>
            <h2>Advanced Search</h2>
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    name="title"
                    value={searchParams.title}
                    onChange={handleInputChange}
                    placeholder="Title"
                    className={styles.searchInput}
                />
                <input
                    type="text"
                    name="author"
                    value={searchParams.author}
                    onChange={handleInputChange}
                    placeholder="Author"
                    className={styles.searchInput}
                />
                <input
                    type="text"
                    name="subject"
                    value={searchParams.subject}
                    onChange={handleInputChange}
                    placeholder="Subject"
                    className={styles.searchInput}
                />
                <Select
                    isMulti
                    name="language"
                    options={languageOptions}
                    onChange={(selectedOptions) =>
                        setSearchParams({
                            ...searchParams,
                            language: selectedOptions.map(
                                (option: { value: string }) => option.value,
                            ),
                        })
                    }
                    value={languageOptions.filter((option) =>
                        searchParams.language.includes(option.value),
                    )}
                    className={styles.searchInput}
                    placeholder="Language"
                />
                <div className={styles.yearPicker}>
                    <input
                        type="text"
                        name="publish_year_start"
                        value={searchParams.publish_year_start}
                        onChange={handleInputChange}
                        placeholder="Start Year"
                        className={styles.searchInput}
                    />
                    <p className={styles.yearPickerSeparator}>to</p>
                    <input
                        type="text"
                        name="publish_year_end"
                        value={searchParams.publish_year_end}
                        onChange={handleInputChange}
                        placeholder="End Year"
                        className={styles.searchInput}
                    />
                </div>
                <button
                    onClick={handleSearchButtonClick}
                    className={styles.searchButton}
                    disabled={
                        isLoading ||
                        Object.values(searchParams).every(
                            (value) => value === '',
                        )
                    }
                >
                    {isLoading ? 'Searching...' : 'Search'}
                </button>
                <div
                    className={`${styles.searchResults} ${searchPerformed ? styles.active : ''}`}
                >
                    {isLoading ? (
                        <p className={styles.searchResultLoading}>Loading...</p>
                    ) : searchResults.length > 0 ? (
                        <ul className={styles.resultsList}>
                            {searchResults.map((result: SearchResult) => (
                                <li
                                    key={result.isbn[0]}
                                    className={styles.resultItem}
                                >
                                    <SearchResultLink result={result} />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className={styles.searchResultNoMatches}>
                            No results found
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};
