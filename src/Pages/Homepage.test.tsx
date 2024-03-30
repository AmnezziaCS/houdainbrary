import { render, screen } from '@testing-library/react';

import { Homepage } from './Homepage';

test('renders homepage', () => {
    render(<Homepage />);
    const homepageText = screen.getByText(/Homepage/i);
    expect(homepageText).toBeInTheDocument();
});
