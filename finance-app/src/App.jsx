import { useState } from 'react';
import './App.css';
import StockForm from './components/StockForm';

function App() {
  return (
    <div className="app-container">
      <div className="dashboard-header">
        <div className="dashboard-branding">
          <img src="/src/images/logo.png" alt="logo" className="dashboard-icon" />
          <h1 className="dashboard-title">Finance Dashboard</h1>
        </div>

        <StockForm />

        <section className="stock-list">
          <h2>Stock List</h2>
          <p>No stocks added yet.</p>
        </section>
      </div>
    </div> //
  );
}

export default App;
