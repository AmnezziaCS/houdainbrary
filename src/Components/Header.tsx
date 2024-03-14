import { Link } from 'react-router-dom';

export const Header = () => (
    <header>
        <h1>HoudainBrary</h1>
        <nav>
            <ul>
                <li>
                    <Link to="/">Homepage</Link>
                </li>
            </ul>
        </nav>
    </header>
);
