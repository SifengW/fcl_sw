import React from "react";
import prisma from '../lib/prisma';
import { useState } from 'react';
import { useRouter } from "next/router";

const HomePage: React.FC = () => {
  const [formData, setFormData] = useState({
    model: '',
    level: '',
    quantity: '',
  });

  const [quantityError, setQuantityError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'quantity' && !/^[1-9]\d*$/.test(value)) {
      setQuantityError('Please enter a positive integer for Quantity.');
    } else {
      setQuantityError('');
    }

    setFormData((prevData) => ({ ...prevData, [name]: value }));

    // Convert values to integers if the field is 'level'
    let processedValue;

    if (name === 'level' || name === 'quantity') {
      processedValue = parseInt(value, 10);
    } else {
      processedValue = value;
    }

    setFormData((prevData) => ({ ...prevData, [name]: processedValue }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (quantityError) {
      window.alert('Please correct the form errors before submitting.');
      return;
    }

    try {
      // Submit the form data to the server-side function
      const response = await fetch('/api/createBatch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message);

        window.alert('Thank you!');
        window.location.reload();
      } else {
        console.error('Error creating batch:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <main>
      <title>FCL</title>
      <div>
        <img id="icon" src='/icon.ico' alt="Icon" />
      </div>

      <form onSubmit={handleSubmit}>
        <h1 id='formTitle'>Batch Form</h1>

        <ul>
          <select id="dropdown" name="model" value={formData.model} onChange={handleChange} required>
            <option value={''} disabled hidden>Model</option>
            <option value={'model1'}>Model 1</option>
            <option value={'model2'}>Model 2</option>
            <option value={'model3'}>Model 3</option>
          </select>
          <select id='dropdown' name="level" value={formData.level} onChange={handleChange} required>
            <option value={''} selected disabled hidden>License Level</option>
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
          </select>
          <li>
            <input id='text' type="text" placeholder="Integer Quantity" required name="quantity" value={formData.quantity} onChange={handleChange}/>
            {quantityError && <p style={{ color: 'red' }}>{quantityError}</p>}
          </li>
        </ul>
          
        <button id="submit" >Submit</button>
      </form>
    </main>
  );
};

export default HomePage;
