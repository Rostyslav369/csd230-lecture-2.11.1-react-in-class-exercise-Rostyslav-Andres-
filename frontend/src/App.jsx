import { useState, useEffect } from 'react'
import Book from './Book'
import BookForm from './BookForm'
import './App.css'

function App() {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadBooks = () => {
        fetch('/api/books')
            .then(res => {
                if (!res.ok) throw new Error("Could not fetch books");
                return res.json();
            })
            .then(data => {
                setBooks(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    };

    useEffect(() => {
        loadBooks();
    }, []);

    const handleAddBook = () => {
        loadBooks();
    };

    const handleDeleteBook = (bookId) => {
        const confirmed = window.confirm("Are you sure you want to delete this book?");

        if (!confirmed) return;

        fetch(`/api/books/${bookId}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    loadBooks();
                } else {
                    alert("Failed to delete the book.");
                }
            })
            .catch(err => {
                console.error(err);
                alert("Error deleting book.");
            });
    };

    if (loading) return <h2>Loading Bookstore Inventory...</h2>;
    if (error) return <h2 style={{color:'red'}}>Error: {error}</h2>;

    return (
        <div className="app-container">

            <h1>Bookstore Management</h1>
            <p>Managing {books.length} books in inventory</p>

            <BookForm onBookAdded={handleAddBook} />

            <div className="book-list">
                {books.map((b) => (
                    <Book
                        key={b.id}
                        id={b.id}
                        title={b.title}
                        author={b.author}
                        price={b.price}
                        onDelete={handleDeleteBook}
                    />
                ))}
            </div>

        </div>
    )
}

export default App