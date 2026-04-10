import { useState } from 'react';
import { useAuth } from './provider/authProvider';

function Game({ id, title, price, copies, platform, genre, studio, rating, onDelete, onUpdate, onAddToCart }) {
    const { isAdmin } = useAuth();

    const [isEditing, setIsEditing] = useState(false);
    const [tempTitle, setTempTitle] = useState(title);
    const [tempPrice, setTempPrice] = useState(price);
    const [tempCopies, setTempCopies] = useState(copies);
    const [tempPlatform, setTempPlatform] = useState(platform);
    const [tempGenre, setTempGenre] = useState(genre);
    const [tempStudio, setTempStudio] = useState(studio || '');
    const [tempRating, setTempRating] = useState(rating || '');

    const handleSave = () => {
        const updatedGame = {
            id,
            title: tempTitle,
            price: parseFloat(tempPrice),
            copies: parseInt(tempCopies),
            platform: tempPlatform,
            genre: tempGenre,
            studio: tempStudio,
            rating: tempRating
        };

        onUpdate(id, updatedGame);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className="book-row editing">
                <input value={tempTitle} onChange={(e) => setTempTitle(e.target.value)} />
                <input type="number" step="0.01" value={tempPrice} onChange={(e) => setTempPrice(e.target.value)} />
                <input type="number" value={tempCopies} onChange={(e) => setTempCopies(e.target.value)} />
                <input value={tempPlatform} onChange={(e) => setTempPlatform(e.target.value)} />
                <input value={tempGenre} onChange={(e) => setTempGenre(e.target.value)} />
                <input value={tempStudio} onChange={(e) => setTempStudio(e.target.value)} />
                <input value={tempRating} onChange={(e) => setTempRating(e.target.value)} />
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
                    <strong>Platform:</strong> {platform} | <strong>Genre:</strong> {genre} | <strong>Studio:</strong> {studio || 'N/A'}
                </p>
                <p>
                    <strong>Rating:</strong> {rating || 'N/A'} | <strong>Price:</strong> ${Number(price).toFixed(2)} | <strong>Copies:</strong> {copies}
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

export default Game;