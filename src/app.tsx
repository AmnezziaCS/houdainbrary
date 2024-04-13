import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';

import BookDetailPage from './Pages/bookDetailsPage';
import { Homepage } from './Pages/homepage';
import { Root } from './Pages/root';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<Root />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/books/:bookId" element={<BookDetailPage />} />
        </Route>,
    ),
);

const App = () => <RouterProvider router={router} />;

export default App;
