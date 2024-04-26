import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';

import BookDetailPage from './pages/bookDetailsPage';
import { HomePage } from './pages/homePage';
import { Root } from './pages/root';
import { SearchPage } from './pages/searchPage';

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
