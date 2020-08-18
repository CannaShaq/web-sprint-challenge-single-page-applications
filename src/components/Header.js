import React from 'react';
import {Link} from 'react-router-dom';


const Header = () => {
    return (
        <div>
            <h1>Lambda Eats</h1>
            <Link to="/">Home </Link>
            <Link to="/form">Buy </Link>
        </div>
    );
}

export default Header;