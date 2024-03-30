import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';

import { Homepage } from './Pages/homepage';
import { Root } from './Pages/root';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<Root />}>
            <Route path="/" element={<Homepage />} />
        </Route>,
    ),
);

const App = () => <RouterProvider router={router} />;

export default App;
