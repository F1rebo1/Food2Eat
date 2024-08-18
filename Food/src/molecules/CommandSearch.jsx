import React, { useState, useEffect } from 'react';
import { Command } from 'cmdk';
import clsx from 'clsx';

const inputStyles = 'w-full p-2 bg-neutral-800 text-white placeholder-gray-400 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500'; 
const listItemStyles = 'flex items-center p-2 rounded-md cursor-pointer hover:bg-maroon active:bg-gold'; 
const activeItemStyles = 'bg-maroon text-white'; 
const separatorStyle = 'border-t border-gray-700 my-2';

export function CommandDemo() {
  const [restaurantList, setRestaurantList] = useState([]);
  const [cuisineList, setCuisineList] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null); // Track index for hover

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch('http://localhost:8080/restaurants');
        const data = await response.json();
        setRestaurantList(data);
      } catch (error) {
        console.error('Failed to fetch restaurants:', error);
      }
    };

    const fetchCuisines = async () => {
      try {
        const response = await fetch('http://localhost:8080/cuisines');
        const data = await response.json();
        setCuisineList(data);
      } catch (error) {
        console.error('Failed to fetch cuisines:', error);
      }
    };

    fetchRestaurants();
    fetchCuisines();
  }, []);

  const handleSelect = (item) => {
    console.log(`Selected: ${item}`);
  };

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div className='flex justify-center'>
      <Command className="rounded-lg border border-gray-700 shadow-md w-96 bg-neutral-900 text-white p-2">
        <Command.Input
          placeholder="Search by Restaurant or Cuisine"
          className={clsx(inputStyles)}
        />
        <Command.List className="mt-2">
          <Command.Empty className="p-2 text-gray-400">No results found.</Command.Empty>

          <Command.Group heading="Restaurants" className="mb-4">
            {restaurantList?.map((restaurant, index) => (
              <Command.Item
                key={restaurant._id}
                tabIndex="0"
                className={clsx(listItemStyles, hoveredIndex === index && activeItemStyles)}
                onSelect={() => handleSelect(restaurant.restaurantName)}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <span className="text-white">{restaurant.restaurantName}</span>
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Separator className={clsx(separatorStyle)} />

          <Command.Group heading="Cuisines" className="mb-2">
            {cuisineList?.map((cuisine, index) => (
              <Command.Item
                key={cuisine}
                tabIndex="0"
                className={clsx(listItemStyles, hoveredIndex === index + restaurantList.length && activeItemStyles)}
                onSelect={() => handleSelect(cuisine)}
                onMouseEnter={() => handleMouseEnter(index + restaurantList.length)}
                onMouseLeave={handleMouseLeave}
              >
                <span className="text-white">{cuisine}</span>
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  );
}

export default CommandDemo;
