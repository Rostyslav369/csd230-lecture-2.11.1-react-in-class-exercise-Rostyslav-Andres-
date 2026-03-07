import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './Navbar'
import Book from './Book'
import BookForm from './BookForm'
import Magazine from './Magazine'
import MagazineForm from './MagazineForm'
import './App.css'

function App() {
    const [books, setBooks] = useState([])
    const [magazines, setMagazines] = useState([])
    const [loadingBooks, setLoadingBooks] = useState(true)
    const [loadingMagazines, setLoadingMagazines] = useState(true)
    const [error, setError] = useState(null)

    const loadBooks = () => {
        fetch('/api/books')
            .then(res => {
                if (!res.ok) throw new Error('Could not fetch books')
                return res.json()
            })
            .then(data => {
                setBooks(data)
                setLoadingBooks(false)
            })
            .catch(err => {
                setError(err.message)
                setLoadingBooks(false)
            })
    }

    const loadMagazines = () => {
        fetch('/api/magazines')
            .then(res => {
                if (!res.ok) throw new Error('Could not fetch magazines')
                return res.json()
            })
            .then(data => {
                setMagazines(data)
                setLoadingMagazines(false)
            })
            .catch(err => {
                setError(err.message)
                setLoadingMagazines(false)
            })
    }

    useEffect(() => {
        loadBooks()
        loadMagazines()
    }, [])

    const handleAddBook = () => {
        loadBooks()
    }

    const handleDeleteBook = (bookId) => {
        const confirmed = window.confirm('Are you sure you want to delete this book?')
        if (!confirmed) return

        fetch(`/api/books/${bookId}`, { method: 'DELETE' })
            .then(res => {
                if (!res.ok) throw new Error('Failed to delete book')
                loadBooks()
            })
            .catch(err => alert(err.message))
    }

    const handleAddMagazine = () => {
        loadMagazines()
    }

    const handleDeleteMagazine = (magazineId) => {
        const confirmed = window.confirm('Are you sure you want to delete this magazine?')
        if (!confirmed) return

        fetch(`/api/magazines/${magazineId}`, { method: 'DELETE' })
            .then(res => {
                if (!res.ok) throw new Error('Failed to delete magazine')
                loadMagazines()
            })
            .catch(err => alert(err.message))
    }

    const handleUpdateMagazine = (updatedMagazine) => {
        fetch(`/api/magazines/${updatedMagazine.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedMagazine),
        })
            .then(res => {
                if (!res.ok) throw new Error('Failed to update magazine')
                return res.json()
            })
            .then(() => {
                loadMagazines()
            })
            .catch(err => alert(err.message))
    }

    if (error) return <h2 style={{ color: 'red' }}>Error: {error}</h2>

    return (
        <div className="app-container">
            <Navbar />

            <Routes>
                <Route path="/" element={<Navigate to="/books" />} />

                <Route
                    path="/books"
                    element={
                        loadingBooks ? (
                            <h2>Loading Books...</h2>
                        ) : (
                            <>
                                <h1>Bookstore Management</h1>
                                <p>Managing {books.length} books in inventory</p>
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
                            </>
                        )
                    }
                />

                <Route
                    path="/add-book"
                    element={
                        <>
                            <h1>Add Book</h1>
                            <BookForm onBookAdded={handleAddBook} />
                        </>
                    }
                />

                <Route
                    path="/magazines"
                    element={
                        loadingMagazines ? (
                            <h2>Loading Magazines...</h2>
                        ) : (
                            <>
                                <h1>Magazine Management</h1>
                                <p>Managing {magazines.length} magazines in inventory</p>
                                <div className="book-list">
                                    {magazines.map((m) => (
                                        <Magazine
                                            key={m.id}
                                            id={m.id}
                                            title={m.title}
                                            price={m.price}
                                            orderQty={m.orderQty}
                                            currentIssue={m.currentIssue}
                                            onDelete={handleDeleteMagazine}
                                            onUpdate={handleUpdateMagazine}
                                        />
                                    ))}
                                </div>
                            </>
                        )
                    }
                />

                <Route
                    path="/add-magazine"
                    element={
                        <>
                            <h1>Add Magazine</h1>
                            <MagazineForm onMagazineAdded={handleAddMagazine} />
                        </>
                    }
                />

                <Route path="*" element={<h2>Page Not Found</h2>} />
            </Routes>
        </div>
    )
}

export default App