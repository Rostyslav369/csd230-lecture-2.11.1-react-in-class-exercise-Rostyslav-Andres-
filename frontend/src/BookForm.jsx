import { useState } from 'react';

function BookForm({ onBookAdded, api }) {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState('');
    const [copies, setCopies] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newBook = {
            title,
            author,
            price: parseFloat(price),
            copies: parseInt(copies)
        };

        try {
            const res = await api.post('/books', newBook);
            onBookAdded(res.data);

            setTitle('');
            setAuthor('');
            setPrice('');
            setCopies('');

            alert('Book added successfully');
        } catch (err) {
            console.error('Add book error:', err.response?.data || err.message);
            alert(`Failed to save book: ${err.response?.status || err.message}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h2>Add New Book</h2>

            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
            />

            <input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author"
                required
            />

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

            <button type="submit">Save to Database</button>
        </form>
    );
}

export default BookForm;