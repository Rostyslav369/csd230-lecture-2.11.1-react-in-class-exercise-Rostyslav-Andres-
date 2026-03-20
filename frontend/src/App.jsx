import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Book from './Book';
import BookForm from './BookForm';
import Magazine from './Magazine';
import MagazineForm from './MagazineForm';
import Game from './Game';
import GameForm from './GameForm';
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

    const handleAddToCart = (id) => {
        alert(`Add to cart clicked for item ${id}`);
    };

    return (
        <>
            <Navbar />

            <Routes>
                <Route path="/" element={<Navigate to={token ? '/books' : '/login'} replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />

                <Route
                    path="/books"
                    element={
                        token ? (
                            <div className="book-list">
                                <h1>Books</h1>
                                {books.map(book => (
                                    <Book
                                        key={book.id}
                                        {...book}
                                        onDelete={handleDeleteBook}
                                        onUpdate={handleUpdateBook}
                                        onAddToCart={handleAddToCart}
                                    />
                                ))}
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
                            <BookForm
                                onBookAdded={(b) => setBooks(prev => [...prev, b])}
                                api={api}
                            />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />

                <Route
                    path="/magazines"
                    element={
                        token ? (
                            <div className="book-list">
                                <h1>Magazines</h1>
                                {magazines.map(magazine => (
                                    <Magazine
                                        key={magazine.id}
                                        {...magazine}
                                        onDelete={handleDeleteMagazine}
                                        onUpdate={handleUpdateMagazine}
                                        onAddToCart={handleAddToCart}
                                    />
                                ))}
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
                            <MagazineForm
                                onMagazineAdded={(m) => setMagazines(prev => [...prev, m])}
                                api={api}
                            />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />

                <Route
                    path="/games"
                    element={
                        token ? (
                            <div className="book-list">
                                <h1>Games</h1>
                                {games.map(game => (
                                    <Game
                                        key={game.id}
                                        {...game}
                                        onDelete={handleDeleteGame}
                                        onUpdate={handleUpdateGame}
                                        onAddToCart={handleAddToCart}
                                    />
                                ))}
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
                            <GameForm
                                onGameAdded={(g) => setGames(prev => [...prev, g])}
                                api={api}
                            />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />
            </Routes>
        </>
    );
}

export default App;