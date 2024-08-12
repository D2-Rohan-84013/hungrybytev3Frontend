import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/pages/Home';
import RestaurantList from './components/pages/RestaurantList';
import Menu from './components/pages/Menu';
import Register from './components/pages/Register';
import Login from "./components/pages/Login";
import Logout from "./components/pages/Logout";
import { isAuthenticated } from './api/hungryByteApi';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={isAuthenticated() ? <Navigate to="/restaurants" /> : <Home />} />
                   <Route path="/home" element={<Home />} />
                <Route path="/restaurants" element={<RestaurantList />} />
                <Route path="/restaurant/:id/menu" element={<Menu />} />
                <Route path="/register" element={isAuthenticated() ? <Navigate to="/restaurants" /> : <Register />} />
                <Route path="/login" element={isAuthenticated() ? <Navigate to="/restaurants" /> : <Login />} />
                <Route path="/logout" element={isAuthenticated() ? <Logout /> : <Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;
