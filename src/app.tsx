import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';

import BookDetailPage from './pages1/bookDetailsPage';
import { HomePage } from './pages1/homePage';
import { Root } from './pages1/root';
import { SearchPage } from './pages1/searchPage';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<Root />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/books/:bookId" element={<BookDetailPage />} />
        </Route>,
    ),
);

const App = () => <RouterProvider router={router} />;

export default App;
