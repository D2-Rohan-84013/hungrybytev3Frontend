import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../api/hungryByteApi';

function Header() {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/restaurants">Restaurants</Link></li>
                {isAuthenticated() ? (
                    <>
                        <li><Link to="/logout">Logout</Link></li>
                    </>
                ) : (
                    <li><Link to="/login">Login</Link></li>
                )}
            </ul>
        </nav>
    );
}

export default Header;
