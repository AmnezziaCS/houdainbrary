import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '../Components/Header';

export const Root = () => {
    return (
        <Fragment>
            <Header />
            <Outlet />
        </Fragment>
    );
};
