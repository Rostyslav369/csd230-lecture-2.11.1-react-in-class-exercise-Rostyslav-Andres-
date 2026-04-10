import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Book from './Book';
import BookForm from './BookForm';
import Magazine from './Magazine';
import MagazineForm from './MagazineForm';
import Game from './Game';
import GameForm from './GameForm';
import Cart from './Cart';
import Login from './pages/Login';
import Logout from './pages/Logout';
import { useAuth } from './provider/authProvider';
import api from './api/axiosConfig';
import './App.css';

function App() {
    const { token, isAdmin } = useAuth();

    const [books, setBooks] = useState([]);
    const [magazines, setMagazines] = useState([]);
    const [games, setGames] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        if (!token) return;

        loadBooks();
        loadMagazines();
        loadGames();
    }, [token]);

    const loadBooks = async () => {
        try {
            const res = await api.get('/books');
            setBooks(res.data);
        } catch (err) {
            console.error('Load books error:', err.response?.data || err.message);
        }
    };

    const loadMagazines = async () => {
        try {
            const res = await api.get('/magazines');
            setMagazines(res.data);
        } catch (err) {
            console.error('Load magazines error:', err.response?.data || err.message);
        }
    };

    const loadGames = async () => {
        try {
            const res = await api.get('/games');
            setGames(res.data);
        } catch (err) {
            console.error('Load games error:', err.response?.data || err.message);
        }
    };

    const handleDeleteBook = async (id) => {
        try {
            await api.delete(`/books/${id}`);
            setBooks(prev => prev.filter(b => b.id !== id));
            alert('Book deleted successfully');
        } catch (err) {
            console.error('Delete book error:', err.response?.data || err.message);
            alert(`Delete failed: ${err.response?.status || err.message}`);
        }
    };

    const handleUpdateBook = async (id, updated) => {
        try {
            const res = await api.put(`/books/${id}`, updated);
            setBooks(prev => prev.map(b => (b.id === id ? res.data : b)));
            alert('Book updated successfully');
        } catch (err) {
            console.error('Update book error:', err.response?.data || err.message);
            alert(`Update failed: ${err.response?.status || err.message}`);
        }
    };

    const handleDeleteMagazine = async (id) => {
        try {
            await api.delete(`/magazines/${id}`);
            setMagazines(prev => prev.filter(m => m.id !== id));
            alert('Magazine deleted successfully');
        } catch (err) {
            console.error('Delete magazine error:', err.response?.data || err.message);
            alert(`Delete failed: ${err.response?.status || err.message}`);
        }
    };

    const handleUpdateMagazine = async (id, updated) => {
        try {
            await api.put(`/magazines/${id}`, updated);
            setMagazines(prev =>
                prev.map(m => (m.id === id ? { ...m, ...updated } : m))
            );
            alert('Magazine updated successfully');
        } catch (err) {
            console.error('Update magazine error:', err.response?.data || err.message);
            alert(`Update failed: ${err.response?.status || err.message}`);
        }
    };

    const handleDeleteGame = async (id) => {
        try {
            await api.delete(`/games/${id}`);
            setGames(prev => prev.filter(g => g.id !== id));
            alert('Game deleted successfully');
        } catch (err) {
            console.error('Delete game error:', err.response?.data || err.message);
            alert(`Delete failed: ${err.response?.status || err.message}`);
        }
    };

    const handleUpdateGame = async (id, updated) => {
        try {
            const res = await api.put(`/games/${id}`, updated);
            setGames(prev => prev.map(g => (g.id === id ? res.data : g)));
            alert('Game updated successfully');
        } catch (err) {
            console.error('Update game error:', err.response?.data || err.message);
            alert(`Update failed: ${err.response?.status || err.message}`);
        }
    };

    const handleAddToCart = (item) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === item.id && i.title === item.title);

            if (existing) {
                return prev.map(i =>
                    i.id === item.id && i.title === item.title
                        ? { ...i, qty: i.qty + 1 }
                        : i
                );
            }

            return [...prev, { ...item, qty: 1 }];
        });
    };

    const renderEmptyState = (message) => (
        <div className="empty-state">{message}</div>
    );

    return (
        <div className="app-shell">
            <div className="app-container">
                <Navbar cartCount={cart.reduce((sum, item) => sum + item.qty, 0)} />

                <Routes>
                    <Route path="/" element={<Navigate to={token ? '/books' : '/login'} replace />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />

                    <Route
                        path="/books"
                        element={
                            token ? (
                                <div className="page-panel">
                                    <div className="page-header">
                                        <div>
                                            <h1>Books</h1>
                                            <p className="page-subtitle">Manage your digital library collection with style.</p>
                                        </div>
                                    </div>

                                    <div className="book-list">
                                        {books.length === 0
                                            ? renderEmptyState('No books available yet.')
                                            : books.map(book => (
                                                <Book
                                                    key={book.id}
                                                    {...book}
                                                    onDelete={handleDeleteBook}
                                                    onUpdate={handleUpdateBook}
                                                    onAddToCart={() => handleAddToCart(book)}
                                                />
                                            ))}
                                    </div>
                                </div>
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        }
                    />

                    <Route
                        path="/add-book"
                        element={
                            token && isAdmin ? (
                                <div className="page-panel">
                                    <BookForm
                                        onBookAdded={(b) => setBooks(prev => [...prev, b])}
                                        api={api}
                                    />
                                </div>
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        }
                    />

                    <Route
                        path="/magazines"
                        element={
                            token ? (
                                <div className="page-panel">
                                    <div className="page-header">
                                        <div>
                                            <h1>Magazines</h1>
                                            <p className="page-subtitle">Browse and manage your magazine catalog.</p>
                                        </div>
                                    </div>

                                    <div className="book-list">
                                        {magazines.length === 0
                                            ? renderEmptyState('No magazines available yet.')
                                            : magazines.map(magazine => (
                                                <Magazine
                                                    key={magazine.id}
                                                    {...magazine}
                                                    onDelete={handleDeleteMagazine}
                                                    onUpdate={handleUpdateMagazine}
                                                    onAddToCart={() => handleAddToCart(magazine)}
                                                />
                                            ))}
                                    </div>
                                </div>
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        }
                    />

                    <Route
                        path="/add-magazine"
                        element={
                            token && isAdmin ? (
                                <div className="page-panel">
                                    <MagazineForm
                                        onMagazineAdded={(m) => setMagazines(prev => [...prev, m])}
                                        api={api}
                                    />
                                </div>
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        }
                    />

                    <Route
                        path="/games"
                        element={
                            token ? (
                                <div className="page-panel">
                                    <div className="page-header">
                                        <div>
                                            <h1>Games</h1>
                                            <p className="page-subtitle">Keep your interactive media collection organized.</p>
                                        </div>
                                    </div>

                                    <div className="book-list">
                                        {games.length === 0
                                            ? renderEmptyState('No games available yet.')
                                            : games.map(game => (
                                                <Game
                                                    key={game.id}
                                                    {...game}
                                                    onDelete={handleDeleteGame}
                                                    onUpdate={handleUpdateGame}
                                                    onAddToCart={() => handleAddToCart(game)}
                                                />
                                            ))}
                                    </div>
                                </div>
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        }
                    />

                    <Route
                        path="/add-game"
                        element={
                            token && isAdmin ? (
                                <div className="page-panel">
                                    <GameForm
                                        onGameAdded={(g) => setGames(prev => [...prev, g])}
                                        api={api}
                                    />
                                </div>
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        }
                    />

                    <Route
                        path="/cart"
                        element={
                            token ? (
                                <Cart cart={cart} setCart={setCart} />
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        }
                    />
                </Routes>
            </div>
        </div>
    );
}

export default App;