import { useState } from 'react';

function GameForm({ onGameAdded, api }) {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [copies, setCopies] = useState('');
    const [platform, setPlatform] = useState('');
    const [genre, setGenre] = useState('');
    const [studio, setStudio] = useState('');
    const [rating, setRating] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newGame = {
            title,
            price: parseFloat(price),
            copies: parseInt(copies),
            platform,
            genre,
            studio,
            rating
        };

        try {
            const res = await api.post('/games', newGame);
            onGameAdded(res.data);

            setTitle('');
            setPrice('');
            setCopies('');
            setPlatform('');
            setGenre('');
            setStudio('');
            setRating('');

            alert('Game added successfully');
        } catch (err) {
            console.error('Add game error:', err.response?.data || err.message);
            alert(`Error adding game: ${err.response?.status || err.message}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="book-form">
            <h2>Add Game</h2>

            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />

            <input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
                required
            />

            <input
                type="number"
                value={copies}
                onChange={(e) => setCopies(e.target.value)}
                placeholder="Copies"
                required
            />

            <input value={platform} onChange={(e) => setPlatform(e.target.value)} placeholder="Platform" required />
            <input value={genre} onChange={(e) => setGenre(e.target.value)} placeholder="Genre" required />
            <input value={studio} onChange={(e) => setStudio(e.target.value)} placeholder="Studio" required />
            <input value={rating} onChange={(e) => setRating(e.target.value)} placeholder="Rating (E, T, M)" required />

            <button type="submit">Add Game</button>
        </form>
    );
}

export default GameForm;