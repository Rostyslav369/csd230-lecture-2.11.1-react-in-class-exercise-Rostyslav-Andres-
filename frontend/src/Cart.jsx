function Cart({ cart, setCart }) {
    const removeItem = (cartKey) => {
        setCart(prev => prev.filter(item => item.cartKey !== cartKey));
    };

    const increaseQty = (cartKey) => {
        setCart(prev =>
            prev.map(item =>
                item.cartKey === cartKey ? { ...item, qty: item.qty + 1 } : item
            )
        );
    };

    const decreaseQty = (cartKey) => {
        setCart(prev =>
            prev
                .map(item =>
                    item.cartKey === cartKey ? { ...item, qty: item.qty - 1 } : item
                )
                .filter(item => item.qty > 0)
        );
    };

    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    return (
        <div className="page-panel">
            <div className="page-header">
                <div>
                    <h1>🛒 Cart</h1>
                    <p className="page-subtitle">Review selected items before checkout.</p>
                </div>
            </div>

            {cart.length === 0 ? (
                <div className="empty-state">Your cart is empty.</div>
            ) : (
                <div className="book-list">
                    {cart.map(item => (
                        <div key={item.cartKey} className="book-row">
                            <div className="book-info">
                                <h3>{item.title}</h3>
                                <p>
                                    <strong>Type:</strong> {item.type} | <strong>Price:</strong> ${Number(item.price).toFixed(2)} | <strong>Qty:</strong> {item.qty}
                                </p>
                            </div>

                            <div className="book-actions">
                                <button onClick={() => decreaseQty(item.cartKey)} style={{ backgroundColor: '#f59e0b', color: 'white' }}>
                                    -1
                                </button>
                                <button onClick={() => increaseQty(item.cartKey)} style={{ backgroundColor: '#2563eb', color: 'white' }}>
                                    +1
                                </button>
                                <button onClick={() => removeItem(item.cartKey)} style={{ backgroundColor: '#ef4444', color: 'white' }}>
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}

                    <div className="page-panel" style={{ marginTop: '8px', padding: '18px' }}>
                        <h2 style={{ margin: 0 }}>Total: ${total.toFixed(2)}</h2>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;