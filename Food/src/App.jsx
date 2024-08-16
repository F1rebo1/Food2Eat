import React, { useState } from 'react';
import './App.css';
import './index.css';

import MenuCard from "./molecules/MenuCard.jsx";
import UseFloatingDock from './organisms/UseFloatingDock.jsx';
import clsx from 'clsx';

const cardContainer = "w-full h-[400px] overflow-y-scroll";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <div className='bg-green-100'>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Quantity is {count}
        </button>
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

export default App;