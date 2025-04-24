import React, { useState } from 'react';
import './StockForm.css';

function StockForm({ onAddStock }) {
    const [symbol, setSymbol] = useState('');
    const [quantity, setQuantity] = useState('');
    const [purchasePrice, setPurchasePrice] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!symbol || !quantity || !purchasePrice) {
            setError('All fields are required.');
            return;
        }

        onAddStock({
            symbol: symbol.toUpperCase(),
            quantity: Number(quantity),
            purchasePrice: Number(purchasePrice),
            currentPrice: 0  // Placeholder, will update in App.jsx
        });

        setSymbol('');
        setQuantity('');
        setPurchasePrice('');
        setError('');
    };

    return (
        <form className="stock-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Stock Symbol"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
            />
            <input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
            />
            <input
                type="number"
                placeholder="Purchase Price"
                step="0.01"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
            />
            <button type="submit">Add Stock</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
}

export default StockForm;
