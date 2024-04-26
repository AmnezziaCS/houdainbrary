import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '../components/header';
import { ShowSearchResultsObj } from '../utils/types';

export const Root = () => {
    const [showSearchResults, setShowSearchResults] =
        useState<ShowSearchResultsObj>({
            isQuerying: false,
            isLoading: false,
        });

    return (
        <div
            onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                setShowSearchResults({
                    isQuerying: false,
                    isLoading: false,
                });
                event.stopPropagation();
            }}
        >
            <Header
                showSearchResults={showSearchResults}
                setShowSearchResults={setShowSearchResults}
            />
            <Outlet />
        </div>
    );
};
