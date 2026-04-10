import { useState } from 'react';

function MovieForm({ onMovieAdded, api }) {
    const [title, setTitle] = useState('');
    const [director, setDirector] = useState('');
    const [genre, setGenre] = useState('');
    const [rating, setRating] = useState('');
    const [price, setPrice] = useState('');
    const [copies, setCopies] = useState('');
    const [durationMinutes, setDurationMinutes] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newMovie = {
            title,
            director,
            genre,
            rating,
            price: parseFloat(price),
            copies: parseInt(copies),
            durationMinutes: parseInt(durationMinutes)
        };

        try {
            const res = await api.post('/movies', newMovie);
            onMovieAdded(res.data);

            setTitle('');
            setDirector('');
            setGenre('');
            setRating('');
            setPrice('');
            setCopies('');
            setDurationMinutes('');

            alert('Movie added successfully');
        } catch (err) {
            console.error('Add movie error:', err.response?.data || err.message);
            alert(`Failed to save movie: ${err.response?.status || err.message}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="book-form">
            <h2>Add New Movie</h2>

            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
            <input value={director} onChange={(e) => setDirector(e.target.value)} placeholder="Director" required />
            <input value={genre} onChange={(e) => setGenre(e.target.value)} placeholder="Genre" required />
            <input value={rating} onChange={(e) => setRating(e.target.value)} placeholder="Rating (G, PG, PG-13, R)" required />

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

            <input
                type="number"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(e.target.value)}
                placeholder="Duration Minutes"
                required
            />

            <button type="submit">Add Movie</button>
        </form>
    );
}

export default MovieForm;