import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { NotFoundPage } from './notFoundPage';

describe('NotFoundPage', () => {
    it('should render not found message and link to home page', () => {
        render(
            <Router>
                <NotFoundPage />
            </Router>,
        );

        const notFoundImage = screen.getByAltText('404 Not Found');
        expect(notFoundImage).toBeInTheDocument();

        const linkElement = screen.getByText('Go to Home Page');
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute('href', '/');
    });
});
