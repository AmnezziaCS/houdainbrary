import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
    OPEN_LIBRARY_COVER_URL_PREFIX,
    OPEN_LIBRARY_URL_PREFIX,
} from '../utils/utils';
import styles from './bookDetailsPage.module.css';

type BookDetails = {
    title: string;
    author_name: string;
    cover_i: number;
    first_publish_year: number;
    publish_place: string[];
};

const BookDetailPage = () => {
    const { bookId } = useParams();

    const [bookDetails, setBookDetails] = useState<BookDetails>({
        title: '',
        author_name: '',
        cover_i: 0,
        first_publish_year: 0,
        publish_place: [],
    });
    // const [wikipediaInfo, setWikipediaInfo] = useState<any>(null);

    useEffect(() => {
        fetchBookDetails(bookId).then((data) => setBookDetails(data));
        // fetchWikipediaInfo(bookId).then(data => setWikipediaInfo(data));
    }, [bookId]);

    const fetchBookDetails = async (bookId: string | undefined) => {
        try {
            const response = await fetch(
                `${OPEN_LIBRARY_URL_PREFIX}/search.json?q=isbn:${bookId}&fields=title,author_name,cover_i,first_publish_year,edition_key,publish_place`,
            );
            if (!response.ok) {
                throw new Error('Failed to fetch book details');
            }
            const data = await response.json();
            return data.docs[0];
        } catch (error) {
            console.error('Error fetching book details:', error);
            return null;
        }
    };

    if (bookDetails?.title === '') {
        return <div>Loading...</div>;
    }

    return (
        (bookDetails && (
            <div className={styles?.bookDetailPage}>
                <h2>{bookDetails?.title}</h2>
                <img
                    src={`${OPEN_LIBRARY_COVER_URL_PREFIX}/b/id/${bookDetails?.cover_i}-M.jpg`}
                    alt="Book Cover"
                />
                <p>
                    Location:{' '}
                    {bookDetails?.publish_place
                        ? bookDetails?.publish_place[0]
                        : 'Unknown'}
                </p>
                <p>Date: {bookDetails?.first_publish_year ?? 'Unknown'}</p>
                <p>Author: {bookDetails.author_name ?? 'Unknown'}</p>
                {/* <div className={styles.wikipediaInfo}>
                <h3>Wikipedia Information</h3>
                <p>{wikipediaInfo.description}</p>
                <img
                    src={wikipediaInfo.cover}
                    alt="Book Cover from Wikipedia"
                />
                <a
                    href={wikipediaInfo.link}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Read more on Wikipedia
                </a>
            </div> */}
            </div>
        )) || <div className={styles.bookNotFound}>Book not found</div>
    );
};

export default BookDetailPage;
