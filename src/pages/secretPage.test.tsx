import { fireEvent, render, screen } from '@testing-library/react';

import { SecretPage } from './secretPage';

describe('SecretPage Component', () => {
    test('renders without crashing', () => {
        render(<SecretPage />);
    });

    test('initially renders with no secret content', () => {
        render(<SecretPage />);
        expect(screen.getByText('Secret Page')).toBeInTheDocument();
        expect(
            screen.getByText('There is nothing to see here.'),
        ).toBeInTheDocument();
        expect(screen.getByText('... ?')).toBeInTheDocument();
    });

    test('renders secret content after clicking the button', () => {
        render(<SecretPage />);
        const button = screen.getByText('... ?');
        fireEvent.click(button);
        expect(
            screen.queryByText('There is nothing to see here.'),
        ).not.toBeInTheDocument();
        expect(screen.queryByText('... ?')).not.toBeInTheDocument();
        expect(screen.getByText('Secret Page')).toBeInTheDocument();
    });
});
