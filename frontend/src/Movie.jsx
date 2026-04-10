import { useState } from 'react';
import { useAuth } from './provider/authProvider';

function Movie({ id, title, director, genre, rating, price, copies, durationMinutes, onDelete, onUpdate, onAddToCart }) {
    const { isAdmin } = useAuth();

    const [isEditing, setIsEditing] = useState(false);
    const [tempTitle, setTempTitle] = useState(title);
    const [tempDirector, setTempDirector] = useState(director);
    const [tempGenre, setTempGenre] = useState(genre);
    const [tempRating, setTempRating] = useState(rating);
    const [tempPrice, setTempPrice] = useState(price);
    const [tempCopies, setTempCopies] = useState(copies);
    const [tempDurationMinutes, setTempDurationMinutes] = useState(durationMinutes);

    const handleSave = () => {
        const updatedMovie = {
            id,
            title: tempTitle,
            director: tempDirector,
            genre: tempGenre,
            rating: tempRating,
            price: parseFloat(tempPrice),
            copies: parseInt(tempCopies),
            durationMinutes: parseInt(tempDurationMinutes)
        };

        onUpdate(id, updatedMovie);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className="book-row editing">
                <input value={tempTitle} onChange={(e) => setTempTitle(e.target.value)} />
                <input value={tempDirector} onChange={(e) => setTempDirector(e.target.value)} />
                <input value={tempGenre} onChange={(e) => setTempGenre(e.target.value)} />
                <input value={tempRating} onChange={(e) => setTempRating(e.target.value)} />
                <input type="number" step="0.01" value={tempPrice} onChange={(e) => setTempPrice(e.target.value)} />
                <input type="number" value={tempCopies} onChange={(e) => setTempCopies(e.target.value)} />
                <input type="number" value={tempDurationMinutes} onChange={(e) => setTempDurationMinutes(e.target.value)} />
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
                    <strong>Director:</strong> {director} | <strong>Genre:</strong> {genre} | <strong>Rating:</strong> {rating}
                </p>
                <p>
                    <strong>Duration:</strong> {durationMinutes} min | <strong>Price:</strong> ${Number(price).toFixed(2)} | <strong>Copies:</strong> {copies}
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

export default Movie;