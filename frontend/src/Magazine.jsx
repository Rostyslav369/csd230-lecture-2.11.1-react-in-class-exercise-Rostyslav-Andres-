import { useState } from 'react';
import { useAuth } from './provider/authProvider';

function Magazine({ id, title, price, copies, orderQty, currentIssue, category, publisher, onDelete, onUpdate, onAddToCart }) {
    const { isAdmin } = useAuth();

    const formatIssueDate = (issue) => {
        if (!issue) return '';
        if (typeof issue === 'string') return issue.slice(0, 16);
        return '';
    };

    const [isEditing, setIsEditing] = useState(false);
    const [tempTitle, setTempTitle] = useState(title || '');
    const [tempPrice, setTempPrice] = useState(price || '');
    const [tempCopies, setTempCopies] = useState(copies || '');
    const [tempOrderQty, setTempOrderQty] = useState(orderQty || '');
    const [tempCurrentIssue, setTempCurrentIssue] = useState(formatIssueDate(currentIssue));
    const [tempCategory, setTempCategory] = useState(category || '');
    const [tempPublisher, setTempPublisher] = useState(publisher || '');

    const handleSave = () => {
        const updatedMagazine = {
            id,
            title: tempTitle,
            price: parseFloat(tempPrice),
            copies: parseInt(tempCopies),
            orderQty: parseInt(tempOrderQty),
            currentIssue: tempCurrentIssue ? `${tempCurrentIssue}:00` : null,
            category: tempCategory,
            publisher: tempPublisher
        };

        onUpdate(id, updatedMagazine);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className="book-row editing">
                <input type="text" value={tempTitle} onChange={(e) => setTempTitle(e.target.value)} placeholder="Title" />
                <input type="text" value={tempCategory} onChange={(e) => setTempCategory(e.target.value)} placeholder="Category" />
                <input type="text" value={tempPublisher} onChange={(e) => setTempPublisher(e.target.value)} placeholder="Publisher" />
                <input type="number" step="0.01" value={tempPrice} onChange={(e) => setTempPrice(e.target.value)} placeholder="Price" />
                <input type="number" value={tempCopies} onChange={(e) => setTempCopies(e.target.value)} placeholder="Copies" />
                <input type="number" value={tempOrderQty} onChange={(e) => setTempOrderQty(e.target.value)} placeholder="Order Qty" />
                <input type="datetime-local" value={tempCurrentIssue} onChange={(e) => setTempCurrentIssue(e.target.value)} />
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
                    <strong>Category:</strong> {category || 'N/A'} | <strong>Publisher:</strong> {publisher || 'N/A'} | <strong>Price:</strong> ${Number(price).toFixed(2)}
                </p>
                <p>
                    <strong>Copies:</strong> {copies} | <strong>Order Qty:</strong> {orderQty} | <strong>Issue:</strong> {formatIssueDate(currentIssue).replace('T', ' ')}
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

export default Magazine;