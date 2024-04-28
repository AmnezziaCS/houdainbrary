import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { BookDetailsPage } from './bookDetailsPage';

const mockBookDetails = {
    title: 'Sample Book Title',
    author_name: 'Sample Author',
    cover_i: '123456',
    publish_place: ['Sample Publish Place'],
    first_publish_year: '2000',
};

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({ bookId: '123456789' }),
}));

describe('BookDetailsPage', () => {
    afterAll(() => {
        jest.restoreAllMocks();
    });

    it('should render book details page with fetched data', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                docs: [mockBookDetails],
            }),
        } as Response);

        render(
            <Router>
                <BookDetailsPage />
            </Router>,
        );

        await screen.findByText(/Sample Book Title/i);

        expect(screen.getByAltText('Book Cover')).toBeInTheDocument();
        expect(screen.getByText(/Sample Author/i)).toBeInTheDocument();
        expect(screen.getByText(/Sample Publish Place/i)).toBeInTheDocument();
        expect(screen.getByText(/2000/i)).toBeInTheDocument();
    });
});
