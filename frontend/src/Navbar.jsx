import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/books">Books</Link>
            <Link to="/add-book">Add Book</Link>
            <Link to="/magazines">Magazines</Link>
            <Link to="/add-magazine">Add Magazine</Link>
        </nav>
    )
}

export default Navbar