import { useState } from 'react';

function MagazineForm({ onMagazineAdded, api }) {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [copies, setCopies] = useState('');
    const [orderQty, setOrderQty] = useState('');
    const [currentIssue, setCurrentIssue] = useState('');
    const [category, setCategory] = useState('');
    const [publisher, setPublisher] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newMagazine = {
            title,
            price: parseFloat(price),
            copies: parseInt(copies),
            orderQty: parseInt(orderQty),
            currentIssue: currentIssue ? `${currentIssue}:00` : null,
            category,
            publisher
        };

        try {
            const res = await api.post('/magazines', newMagazine);
            onMagazineAdded(res.data);

            setTitle('');
            setPrice('');
            setCopies('');
            setOrderQty('');
            setCurrentIssue('');
            setCategory('');
            setPublisher('');

            alert('Magazine added successfully');
        } catch (err) {
            console.error('Add magazine error:', err.response?.data || err.message);
            alert(`Failed to save magazine: ${err.response?.status || err.message}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="book-form">
            <h2>Add New Magazine</h2>

            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
            <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" required />
            <input value={publisher} onChange={(e) => setPublisher(e.target.value)} placeholder="Publisher" required />

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
                value={orderQty}
                onChange={(e) => setOrderQty(e.target.value)}
                placeholder="Order Quantity"
                required
            />

            <input
                type="datetime-local"
                value={currentIssue}
                onChange={(e) => setCurrentIssue(e.target.value)}
                required
            />

            <button type="submit">Save to Database</button>
        </form>
    );
}

export default MagazineForm;