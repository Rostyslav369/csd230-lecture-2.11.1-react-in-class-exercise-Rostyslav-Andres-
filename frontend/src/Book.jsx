import { useState } from 'react';
import { useAuth } from './provider/authProvider';

function Book({ id, title, author, genre, isbn, publisher, price, copies, onDelete, onUpdate, onAddToCart }) {
    const { isAdmin } = useAuth();

    const [isEditing, setIsEditing] = useState(false);
    const [tempTitle, setTempTitle] = useState(title);
    const [tempAuthor, setTempAuthor] = useState(author);
    const [tempGenre, setTempGenre] = useState(genre || '');
    const [tempIsbn, setTempIsbn] = useState(isbn || '');
    const [tempPublisher, setTempPublisher] = useState(publisher || '');
    const [tempPrice, setTempPrice] = useState(price);
    const [tempCopies, setTempCopies] = useState(copies ?? 1);

    const handleSave = () => {
        const updatedBook = {
            id,
            title: tempTitle,
            author: tempAuthor,
            genre: tempGenre,
            isbn: tempIsbn,
            publisher: tempPublisher,
            price: parseFloat(tempPrice),
            copies: parseInt(tempCopies)
        };

        onUpdate(id, updatedBook);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className="book-row editing">
                <input type="text" value={tempTitle} onChange={(e) => setTempTitle(e.target.value)} />
                <input type="text" value={tempAuthor} onChange={(e) => setTempAuthor(e.target.value)} />
                <input type="text" value={tempGenre} onChange={(e) => setTempGenre(e.target.value)} />
                <input type="text" value={tempIsbn} onChange={(e) => setTempIsbn(e.target.value)} />
                <input type="text" value={tempPublisher} onChange={(e) => setTempPublisher(e.target.value)} />
                <input type="number" step="0.01" value={tempPrice} onChange={(e) => setTempPrice(e.target.value)} />
                <input type="number" value={tempCopies} onChange={(e) => setTempCopies(e.target.value)} />
                <button onClick={handleSave}>Save</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
        );
    }

    return (
        <div className="book-row">
            <div className="book-info">
                <h3>{title}</h3>
                <p>
                    <strong>Author:</strong> {author} | <strong>Genre:</strong> {genre || 'N/A'} | <strong>Price:</strong> ${Number(price).toFixed(2)}
                </p>
                <p>
                    <strong>ISBN:</strong> {isbn || 'N/A'} | <strong>Publisher:</strong> {publisher || 'N/A'} | <strong>Copies:</strong> {copies}
                </p>
            </div>

            <div className="book-actions">
                <button onClick={onAddToCart} style={{ backgroundColor: '#28a745', color: 'white' }}>
                    🛒 Add to Cart
                </button>

                {isAdmin && (
                    <>
                        <button onClick={() => setIsEditing(true)} style={{ backgroundColor: '#ffc107' }}>
                            Edit
                        </button>
                        <button onClick={() => onDelete(id)} style={{ backgroundColor: '#ff4444', color: 'white' }}>
                            Delete
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Book;