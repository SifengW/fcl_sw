"use client";
import './globals.css';
import { useState } from 'react';

export default function Home() {
  const [model, setModel] = useState('');
  const [date, setDate] = useState('');
  const [quantity, setQuantity] = useState('');
  const [licenseLevel, setLicenseLevel] = useState('');
  // const [comment, setComment] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ model, date, quantity, licenseLevel }),
    });

    if (response.ok) {
      setModel('');
      setDate('');
      setQuantity('');
      setLicenseLevel('');
      alert("Batch submitted successfully!");
    } else {
      alert("Failed to submit the batch.");
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <div className="form-header">
          <h2 className="form-title">Batch Form</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label>Model</label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="form-input"
              required
            >
              <option value="" disabled selected>Select a model</option>
              <option value="Model 1">Model 1</option>
              <option value="Model 2">Model 2</option>
              <option value="Model 3">Model 3</option>
            </select>
          </div>
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="form-input"
              min="1"
              defaultValue="0"
              required
            />
          </div>
          <div className="form-group">
            <label>License Level</label>
            <select
              value={licenseLevel}
              onChange={(e) => setLicenseLevel(e.target.value)}
              className="form-input"
              required
            >
              <option value="" disabled selected>Select a level</option>
              {Array.from({ length: 10 }, (_, level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
