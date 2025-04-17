import React from 'react';
import './StockForm.css'; // Import the CSS file

function StockForm() {
    return (
        <form className="stock-form">


            <div className="form-group">
                <input
                    type="text"
                    id="symbol"
                    name="symbol"
                    placeholder="Stock Symbol"
                />
            </div>

            <div className="form-group">
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    placeholder="Quantity"
                />
            </div>

            <div className="form-group">
                <input
                    type="number"
                    id="price"
                    name="price"
                    placeholder="Purchase Price"
                    step="0.01"
                />
            </div>


            <button type="submit">Add Stock</button>
        </form>
    );
}

export default StockForm;
