import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';

import BookDetailPage from './Pages/bookDetailsPage';
import { HomePage } from './Pages/homePage';
import { Root } from './Pages/root';
import { SearchPage } from './Pages/searchPage';

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
