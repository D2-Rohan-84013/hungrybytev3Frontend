import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import sunImage from '../../images/sun.png';
import eatingTogether from '../../images/eating_together.png';

const Home = () => {
    return (
        <div>
            <nav className="navbar">
                <div className="navbar-logo">
                    <Link to="/">HungryByte</Link>
                </div>
                <div className="navbar-links">
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                    <Link to="/orders">Orders</Link>
                    <Link to="/about">About</Link>
                    <Link to="/cart">Cart</Link>
                </div>
            </nav>

            <div className="home-container">
                <div className="hero-section">
                    <div className="hero-content">
                        <img src={sunImage} alt="Sun" className="sun-image" />
                        <h1>Don't Wait!</h1>
                        <p>Are you hungry?</p>
                        <div className="hero-buttons">
                            <button className="order-now-btn">Order Now</button>
                            <button className="view-more-btn">View More</button>
                        </div>
                    </div>
                    <div className="hero-image">
                        <img src={eatingTogether} alt="Eating Together" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
