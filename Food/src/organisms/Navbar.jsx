import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
// import clsx from 'clsx';

const style = {
    light: 'bg-orange-400',
    dark: 'bg-red-400',
};

const Navbar = ({ classname, variant="light" }) => {
    const styles = style[variant];
    // The link to the menu page is only for testing purposes

    return (<>
        <div className={clsx(classname, styles)}>
            <a href="/home" className='px-4'>Home</a>
            <a href="/about" className='px-4'>About</a>
            <a href="/menu" className='px-4'>Menu</a>
        </div>
    </>);
};

export default Navbar;

Navbar.propTypes = {
    classname: PropTypes.string,
    variant: PropTypes.string
};