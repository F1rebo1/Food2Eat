import React, { useState } from 'react';
// import PropTypes from 'prop-types';

import '../App.css';
import '../index.css';

import MenuCard from "../molecules/MenuCard.jsx";
import UseFloatingDock from '../organisms/UseFloatingDock.jsx';
import Navbar from '../organisms/Navbar.jsx';
import clsx from 'clsx';

const cardContainer = "w-full h-[400px] overflow-y-scroll";

function MenuPage() {
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
        <MenuCard />
      </div>
      <div>
        <UseFloatingDock />
      </div>
    </div>
    </>
  );
}

export default MenuPage;