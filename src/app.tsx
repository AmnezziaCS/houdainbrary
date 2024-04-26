import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';

import { BookDetailsPage } from './pages/bookDetailsPage';
import { HomePage } from './pages/homePage';
import { Root } from './pages/root';
import { SearchPage } from './pages/searchPage';
import { SecretPage } from './pages/secretPage';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<Root />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/secret" element={<SecretPage />} />
            <Route path="/books/:bookId" element={<BookDetailsPage />} />
        </Route>,
    ),
);

const App = () => <RouterProvider router={router} />;

export default App;
