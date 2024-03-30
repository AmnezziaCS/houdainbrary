import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { Header } from './header';

test('should render header with navigation links', () => {
    render(
        <BrowserRouter>
            <Header />
        </BrowserRouter>,
    );

    const logoElement = screen.getByText(/HoudainBrary/i);
    expect(logoElement).toBeInTheDocument();

    const homepageLink = screen.getByText(/Homepage/i);
    expect(homepageLink).toBeInTheDocument();

    const booksLink = screen.getByText(/Books/i);
    expect(booksLink).toBeInTheDocument();

    const authorsLink = screen.getByText(/Authors/i);
    expect(authorsLink).toBeInTheDocument();
});
