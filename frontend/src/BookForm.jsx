import { useState } from 'react';

function BookForm({ onBookAdded }) {

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState(0);
    const [copies, setCopies] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newBook = {
            title,
            author,
            price: Number(price),
            copies: Number(copies)
        };

        fetch('/api/books', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newBook),
        })
            .then(response => {
                if (!response.ok) throw new Error("Failed to save book");
                return response.json();
            })
            .then(() => {
                alert("Book Saved!");
                onBookAdded();

                setTitle('');
                setAuthor('');
                setPrice(0);
                setCopies(1);
            })
            .catch(err => {
                alert(err.message);
            });
    };

    return (

        <form onSubmit={handleSubmit} className="book-form">

            <h3>Add New Book</h3>

            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                required
            />

            <input
                type="text"
                placeholder="Author"
                value={author}
                onChange={(e)=>setAuthor(e.target.value)}
                required
            />

            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e)=>setPrice(e.target.value)}
                required
            />

            <input
                type="number"
                placeholder="Copies"
                value={copies}
                onChange={(e)=>setCopies(e.target.value)}
                required
            />

            <button type="submit">
                Save to Database
            </button>

        </form>
    );
}

export default BookForm;