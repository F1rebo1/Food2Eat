import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Asynchronous function to check if the restaurant exists
async function checkIfRestaurantExists(restaurantName) {
    try {
        const url = `http://localhost:8080/restaurants?restaurantName=${restaurantName}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            return false; // If the response status is not OK, return false
        }

        const data = await response.json(); // Get the response JSON data

        // Assuming the data is an array or object and is empty if the restaurant is not found
        if (!data || data.length === 0) {
            return false; // No restaurant found
        }

        return true; // Restaurant exists
    } catch (error) {
        console.error(error.message);
        return false; // In case of any error, return false
    }
}

function SearchBar() {
  const [text, setText] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (text.trim()) {
        const exists = await checkIfRestaurantExists(text); // Await the async function
        if (exists) {
            navigate(`/menu?restaurantName=${text}`); // Navigate to the page based on the input
        } else {
            alert("Restaurant not found!"); // Handle the case where the restaurant doesn't exist
        }
    }
  };

  return (
    <>
        <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter restaurant name"
            rows={2}
            cols={30}
        />
        <form onSubmit={handleSubmit}>
            <button type="submit">Go</button>
        </form>
    </>
  );
}

export default SearchBar;
