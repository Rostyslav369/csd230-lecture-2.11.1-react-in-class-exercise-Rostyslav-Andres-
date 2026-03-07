import { useState } from 'react'

function MagazineForm({ onMagazineAdded }) {
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState(0)
    const [orderQty, setOrderQty] = useState(1)
    const [currentIssue, setCurrentIssue] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        const newMagazine = {
            title,
            price: Number(price),
            orderQty: Number(orderQty),
            currentIssue: currentIssue ? `${currentIssue}T00:00:00` : null
        }

        fetch('/api/magazines', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newMagazine),
        })
            .then(res => {
                if (!res.ok) throw new Error('Failed to save magazine')
                return res.json()
            })
            .then(() => {
                alert('Magazine Saved!')
                onMagazineAdded()
                setTitle('')
                setPrice(0)
                setOrderQty(1)
                setCurrentIssue('')
            })
            .catch(err => {
                alert(err.message)
            })
    }

    return (
        <form onSubmit={handleSubmit} className="book-form">
            <h3>Add New Magazine</h3>

            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />

            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
            />

            <input
                type="number"
                placeholder="Order Quantity"
                value={orderQty}
                onChange={(e) => setOrderQty(e.target.value)}
                required
            />

            <input
                type="date"
                value={currentIssue}
                onChange={(e) => setCurrentIssue(e.target.value)}
                required
            />

            <button type="submit">Save Magazine</button>
        </form>
    )
}

export default MagazineForm