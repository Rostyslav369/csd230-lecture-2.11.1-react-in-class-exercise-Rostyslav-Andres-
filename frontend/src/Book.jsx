function Book({ id, title, author, price, onDelete }) {

    return (
        <div className="book-row">

            <div className="book-info">
                <h3>{title}</h3>

                <p>
                    <strong>Author:</strong> {author} |
                    <strong> Price:</strong> ${Number(price).toFixed(2)}
                </p>
            </div>

            <button
                className="delete-btn"
                onClick={() => onDelete(id)}
            >
                Delete
            </button>

        </div>
    );

}

export default Book;