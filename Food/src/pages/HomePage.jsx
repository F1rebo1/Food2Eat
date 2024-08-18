import React from 'react';
import '../index.css';
import Navbar from '../organisms/Navbar.jsx';
import SearchBar from '../organisms/SearchBar.jsx';
import CommandMenu from '../molecules/CommandSearch.jsx';

function HomePage() {
  return (
    <>
        <Navbar variant="dark" />
        <h1>Welcome home</h1>
        <br />
        {/* <SearchBar /> */}
        <CommandMenu />
    </>
  );
}

export default HomePage;