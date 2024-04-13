import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { OPEN_LIBRARY_URL_PREFIX } from '../utils/utils';
import styles from './bookDetailsPage.module.css';

type BookDetails = {
    title: string;
    author_name: string;
    cover_i: number;
    publish_date: string[];
    publish_place: string[];
};

const BookDetailPage = () => {
    const { bookId } = useParams();

    const [bookDetails, setBookDetails] = useState<BookDetails>({
        title: '',
        author_name: '',
        cover_i: 0,
        publish_date: [],
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
                `${OPEN_LIBRARY_URL_PREFIX}/search.json?q=isbn:${bookId}&fields=title,author_name,cover_i,publish_date,edition_key,publish_place`,
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

    console.log(bookDetails);

    if (!bookDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles?.bookDetailPage}>
            <h2>{bookDetails?.title}</h2>
            <img
                src={`https://covers.openlibrary.org/b/id/${bookDetails?.cover_i}-M.jpg`}
                alt="Book Cover"
            />
            <p>Location: {bookDetails?.publish_place[0]}</p>
            <p>Date: {bookDetails?.publish_date[0]}</p>
            <p>Author: {bookDetails?.author_name}</p>
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
    );
};

export default BookDetailPage;
