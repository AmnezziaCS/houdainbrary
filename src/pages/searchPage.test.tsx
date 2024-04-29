import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { SearchPage } from './searchPage';

const mockSearchResults = [
    { isbn: ['123456789'], title: 'Sample Book 1' },
    { isbn: ['987654321'], title: 'Sample Book 2' },
];

beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ docs: mockSearchResults }),
    } as Response);
});

beforeEach(() => {
    jest.clearAllMocks();
});

describe('SearchPage', () => {
    it('should render advanced search form and perform search', async () => {
        render(
            <Router>
                <SearchPage />
            </Router>,
        );

        const titleInput = screen.getByPlaceholderText('Title');
        fireEvent.change(titleInput, { target: { value: 'Sample Title' } });

        const authorInput = screen.getByPlaceholderText('Author');
        fireEvent.change(authorInput, { target: { value: 'John Doe' } });

        const subjectInput = screen.getByPlaceholderText('Subject');
        fireEvent.change(subjectInput, { target: { value: 'Sample Subject' } });

        const startYearInput = screen.getByPlaceholderText('Start Year');
        fireEvent.change(startYearInput, { target: { value: '2000' } });

        const endYearInput = screen.getByPlaceholderText('End Year');
        fireEvent.change(endYearInput, { target: { value: '2022' } });

        const searchButton = screen.getByText('Search');
        fireEvent.click(searchButton);

        expect(await screen.findByText('Sample Book 1')).toBeInTheDocument();
        expect(screen.getByText('Sample Book 2')).toBeInTheDocument();
    });
});
