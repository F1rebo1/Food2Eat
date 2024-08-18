import React, { useState } from 'react';
// import PropTypes from 'prop-types';

import '../App.css';
import '../index.css';

import Navbar from '../organisms/Navbar.jsx';
import clsx from 'clsx';
import RestaurantCard from '../molecules/RestaurantCard.jsx';

const cardContainer = "w-full h-[400px] overflow-y-scroll";

function RestaurantPage() {
  const [count, setCount] = useState(0);

  return (
    <>
    <Navbar variant="dark" />
    <div className='bg-green-100'>
      <div className="card">
        <h1>
            <button onClick={() => setCount((count) => count + 1)}>
                Quantity is {count}
            </button>
        </h1>
      </div>
      <div className={clsx(cardContainer)}>
        <RestaurantCard />
      </div>
    </div>
    </>
  );
}

export default RestaurantPage;