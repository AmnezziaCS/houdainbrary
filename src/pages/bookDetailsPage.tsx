import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { BookDetails, WikipediaBookInfo } from '../utils/types';
import {
    EMPTY_BOOK_INFO,
    EMPTY_WIKIPEDIA_INFO,
    OPEN_LIBRARY_COVER_URL_PREFIX,
    OPEN_LIBRARY_URL_PREFIX,
    WIKIPEDIA_API_URL_PREFIX,
} from '../utils/utils';
import styles from './bookDetailsPage.module.css';

const extractCountryFromWikipediaRevision = (revision: string | null) => {
    if (!revision) {
        return null;
    }
    const countryRegex = /\| country\s*=\s*([\w\s]+)\n/i;
    const match = revision.match(countryRegex);
    return match ? match[1].trim() : null;
};

export const BookDetailsPage = () => {
    const { bookId } = useParams();

    const [bookDetails, setBookDetails] =
        useState<BookDetails>(EMPTY_BOOK_INFO);
    const [wikipediaInfo, setWikipediaInfo] =
        useState<WikipediaBookInfo>(EMPTY_WIKIPEDIA_INFO);

    useEffect(() => {
        fetchBookDetails(bookId).then((data) => setBookDetails(data));
    }, [bookId]);

    useEffect(() => {
        if (bookDetails?.title) {
            fetchWikipediaInfo(bookDetails.title).then((data) =>
                setWikipediaInfo(data),
            );
        }
    }, [bookDetails]);

    const fetchBookDetails = async (
        bookId: string | undefined,
    ): Promise<BookDetails> => {
        const response = await fetch(
            `${OPEN_LIBRARY_URL_PREFIX}/search.json?q=isbn:${bookId}&fields=title,author_name,cover_i,first_publish_year,edition_key,publish_place`,
        )
            .then((response) => response.json())
            .catch((error) => {
                console.error('Error fetching book details:', error);
            });

        if (!response.docs || response.docs.length === 0) {
            return EMPTY_BOOK_INFO;
        }

        return response.docs[0];
    };

    const fetchWikipediaInfo = async (
        bookTitle: string,
    ): Promise<WikipediaBookInfo> => {
        const response = await fetch(
            `${WIKIPEDIA_API_URL_PREFIX}?action=query&format=json&prop=extracts|revisions&rvprop=content&titles=${bookTitle}&exintro=1&explaintext=1&origin=*`,
        )
            .then((response) => response.json())
            .catch((error) => {
                console.error('Error fetching data:', error);
            });

        if (response.query.pages['-1']) {
            return EMPTY_WIKIPEDIA_INFO;
        }
        const pageId = Object.keys(response.query.pages)[0];
        if (!response.query.pages[pageId]) {
            return EMPTY_WIKIPEDIA_INFO;
        }

        const shortDescription = response.query.pages[pageId]?.extract;
        const coverUrl = response.query.pages[pageId]?.thumbnail
            ? response.query.pages[pageId]?.thumbnail.source
            : null;
        const bookCountry = extractCountryFromWikipediaRevision(
            response.query.pages[pageId]?.revisions[0]['*'],
        );
        const wikipediaPageLink = `https://en.wikipedia.org/?curid=${pageId}`;

        return {
            description: shortDescription,
            bookCountry: bookCountry,
            coverUrl: coverUrl,
            pageLink: wikipediaPageLink,
        };
    };

    if (bookDetails?.title === '') {
        return <div>Loading...</div>;
    }

    return (
        (bookDetails && (
            <div className={styles?.bookDetailPage}>
                <h2>{bookDetails?.title}</h2>
                <img
                    src={
                        bookDetails?.cover_i
                            ? `${OPEN_LIBRARY_COVER_URL_PREFIX}/b/id/${bookDetails.cover_i}-M.jpg`
                            : `${process.env.PUBLIC_URL}/images/bookNotFound.jpg`
                    }
                    alt="Book Cover"
                />

                {wikipediaInfo.bookCountry ? (
                    <p>First publish location: {wikipediaInfo.bookCountry}</p>
                ) : (
                    <p>
                        Editions locations:{' '}
                        {bookDetails?.publish_place.join(' | ') ?? 'Unknown'}
                    </p>
                )}
                <p>
                    First publish year date:{' '}
                    {bookDetails?.first_publish_year ?? 'Unknown'}
                </p>
                <p>Author: {bookDetails.author_name ?? 'Unknown'}</p>
                <div className={styles.wikipediaInfo}>
                    <h3>Wikipedia Information</h3>
                    {wikipediaInfo === EMPTY_WIKIPEDIA_INFO ? (
                        <p>No information found on Wikipedia</p>
                    ) : (
                        <Fragment>
                            <p>{wikipediaInfo.description}</p>
                            <a
                                href={wikipediaInfo.pageLink}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Read more on Wikipedia
                            </a>
                        </Fragment>
                    )}
                </div>
            </div>
        )) || <div className={styles.bookNotFound}>Book not found</div>
    );
};
