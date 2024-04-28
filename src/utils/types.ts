export type SearchResult = {
    title: string;
    isbn: string[];
};

export type BookDetails = {
    title: string;
    author_name: string;
    cover_i: number;
    first_publish_year: number;
    publish_place: string[];
};

export type WikipediaBookInfo = {
    description: string;
    bookCountry: string | null;
    coverUrl: string;
    pageLink: string;
};

export type ShowSearchResultsObj = {
    isQuerying: boolean;
    isLoading: boolean;
};

export type Change = {
    timestamp: string;
    comment: string;
    author: {
        key: string;
    } | null;
};
