import { useState, useEffect } from 'react';
import './App.css';
import StockForm from './components/StockForm';

function App() {
  const [stocks, setStocks] = useState([]);

  const API_KEY = 'YNN65NW8ZHCU0YRR1';

  // Function to fetch latest prices for all stocks
  const updateStockPrices = async () => {
    const updatedStocks = await Promise.all(stocks.map(async (stock) => {
      const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock.symbol}&apikey=${API_KEY}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        const newPrice = data['Global Quote'] && data['Global Quote']['05. price']
          ? parseFloat(data['Global Quote']['05. price'])
          : stock.currentPrice;  // If API fails, keep old price

        return { ...stock, currentPrice: newPrice };
      } catch (error) {
        console.error(`Failed to update ${stock.symbol}`, error);
        return stock;  // Return original stock if fetch fails
      }
    }));

    setStocks(updatedStocks);
  };

  // Fetch prices on mount and whenever stocks change
  useEffect(() => {
    if (stocks.length > 0) {
      updateStockPrices();
    }
  }, [stocks.length]);  // Trigger only when stocks are added

  const addStock = (stock) => {
    setStocks((prev) => [...prev, stock]);
  };

  return (
    <div className="app-container">
      <div className="dashboard-header">
        <div className="dashboard-branding">
          <img src="/src/images/logo.png" alt="logo" className="dashboard-icon" />
          <h1 className="dashboard-title">Finance Dashboard</h1>
        </div>

        <StockForm onAddStock={addStock} />

        <h2 className="stock-heading">Stock List</h2>

        {stocks.length === 0 ? (
          <p>No stocks available.</p>
        ) : (
          <div className="stock-list-container">
            {stocks.map((stock, index) => {
              const profitLoss = (stock.currentPrice - stock.purchasePrice) * stock.quantity;

              return (
                <div key={index} className="stock-card">
                  <strong className="stock-symbol">{stock.symbol.toUpperCase()}</strong><br />
                  Quantity: {stock.quantity}<br />
                  Purchase Price: ${stock.purchasePrice.toFixed(2)}<br />
                  Current Price: ${stock.currentPrice.toFixed(2)}<br />
                  <strong className={profitLoss >= 0 ? 'profit' : 'loss'}>
                    Profit/Loss: ${profitLoss.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </strong>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
