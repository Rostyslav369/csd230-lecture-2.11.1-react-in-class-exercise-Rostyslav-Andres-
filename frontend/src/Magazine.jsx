import { useState } from 'react'

function Magazine({ id, title, price, currentIssue, orderQty, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false)
    const [editedTitle, setEditedTitle] = useState(title)
    const [editedPrice, setEditedPrice] = useState(price)
    const [editedOrderQty, setEditedOrderQty] = useState(orderQty || 0)
    const [editedCurrentIssue, setEditedCurrentIssue] = useState(
        currentIssue ? currentIssue.split('T')[0] : ''
    )

    const handleSave = () => {
        const updatedMagazine = {
            id,
            title: editedTitle,
            price: Number(editedPrice),
            orderQty: Number(editedOrderQty),
            currentIssue: editedCurrentIssue ? `${editedCurrentIssue}T00:00:00` : null
        }

        onUpdate(updatedMagazine)
        setIsEditing(false)
    }

    return (
        <div className="book-row">
            {isEditing ? (
                <div className="book-info" style={{ width: '100%' }}>
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                    />
                    <input
                        type="number"
                        value={editedPrice}
                        onChange={(e) => setEditedPrice(e.target.value)}
                    />
                    <input
                        type="number"
                        value={editedOrderQty}
                        onChange={(e) => setEditedOrderQty(e.target.value)}
                    />
                    <input
                        type="date"
                        value={editedCurrentIssue}
                        onChange={(e) => setEditedCurrentIssue(e.target.value)}
                    />

                    <div style={{ marginTop: '10px' }}>
                        <button onClick={handleSave}>Save</button>
                        <button onClick={() => setIsEditing(false)} style={{ marginLeft: '10px' }}>
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <div className="book-info">
                        <h3>{title}</h3>
                        <p>
                            <strong>Price:</strong> ${Number(price).toFixed(2)}
                            {' | '}
                            <strong>Issue:</strong> {currentIssue ? currentIssue.split('T')[0] : 'N/A'}
                            {' | '}
                            <strong>Order Qty:</strong> {orderQty}
                        </p>
                    </div>

                    <div>
                        <button onClick={() => setIsEditing(true)} style={{ marginRight: '10px' }}>
                            Update
                        </button>
                        <button className="delete-btn" onClick={() => onDelete(id)}>
                            Delete
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}

export default Magazine