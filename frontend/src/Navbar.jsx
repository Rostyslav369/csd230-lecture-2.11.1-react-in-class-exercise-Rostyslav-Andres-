import { Link } from 'react-router-dom';
import { useAuth } from './provider/authProvider';

function Navbar() {
    const { token, isAdmin } = useAuth();

    return (
        <nav className="navbar">
            <div className="navbar-brand">🚀 CloudShelf Admin</div>

            <div className="navbar-links">
                <Link to="/books">Books</Link>
                {isAdmin && <Link to="/add-book">Add Book</Link>}

                <Link to="/magazines">Magazines</Link>
                {isAdmin && <Link to="/add-magazine">Add Magazine</Link>}

                <Link to="/games">Games</Link>
                {isAdmin && <Link to="/add-game">Add Game</Link>}

                {!token && <Link to="/login">Login</Link>}
                {token && <Link to="/logout">Logout</Link>}
            </div>
        </nav>
    );
}

export default Navbar;