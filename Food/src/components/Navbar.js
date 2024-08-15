import { PropTypes } from 'react';
import clsx from 'clsx';
// import clsx from 'clsx';

const style = {
    "light": {

    },
    "dark": {

    }
};

const Navbar = ({ classname, variant }) => {
    const styles = style[variant];
    return (<><div className={clsx(classname, styles)}></div></>);
};

export default Navbar;

Navbar.propTypes = {
    classname: PropTypes.string,
    variant: PropTypes.string
};