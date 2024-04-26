import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { Header } from './header';

test('should render header with navigation links', () => {
    render(
        <BrowserRouter>
            <Header
                showSearchResults={{
                    isQuerying: false,
                    isLoading: false,
                }}
                setShowSearchResults={() => {}}
            />
        </BrowserRouter>,
    );

    const logoElement = screen.getByText(/HoudainBrary/i);
    expect(logoElement).toBeInTheDocument();

    const homepageLink = screen.getByText(/Homepage/i);
    expect(homepageLink).toBeInTheDocument();

    const advancedSearchLink = screen.getByText(/Advanced Search/i);
    expect(advancedSearchLink).toBeInTheDocument();

    const settingsLink = screen.getByText(/Secret/i);
    expect(settingsLink).toBeInTheDocument();
});
