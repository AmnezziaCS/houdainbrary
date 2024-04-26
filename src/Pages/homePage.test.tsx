import { render, screen } from '@testing-library/react';

import { HomePage } from './homePage';

beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: () =>
            Promise.resolve([
                {
                    timestamp: '2024-03-30T12:00:00Z',
                    comment: 'Document updated',
                    author: { key: 'JohnDoe' },
                },
            ]),
    } as Response);
});

beforeEach(() => {
    jest.clearAllMocks();
});

test('should render homepage', async () => {
    render(<HomePage />);
    const homePageText = screen.getByText(/Welcome to HoudainBrary/i);
    expect(homePageText).toBeInTheDocument();

    await screen.findByText(/Document updated/i);
    expect(screen.getByText(/Document updated/i)).toBeInTheDocument();
    expect(screen.getByText(/Author: JohnDoe/i)).toBeInTheDocument();
});
