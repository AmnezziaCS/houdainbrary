import { BookDetails, WikipediaBookInfo } from './types';

export const OPEN_LIBRARY_URL_PREFIX = 'https://openlibrary.org';
export const OPEN_LIBRARY_COVER_URL_PREFIX = 'https://covers.openlibrary.org';
export const WIKIPEDIA_API_URL_PREFIX = 'https://en.wikipedia.org/w/api.php';

export const EMPTY_BOOK_INFO: BookDetails = {
    title: '',
    author_name: '',
    cover_i: 0,
    first_publish_year: 0,
    publish_place: [],
};
export const EMPTY_WIKIPEDIA_INFO: WikipediaBookInfo = {
    description: '',
    bookCountry: '',
    coverUrl: '',
    pageLink: '',
};
