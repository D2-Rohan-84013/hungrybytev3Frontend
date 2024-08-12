import React, { useEffect } from 'react';
import { logout } from '../../api/hungryByteApi';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        logout(); // Clear the token from local storage
        navigate('/'); // Redirect to home page
    }, [navigate]);

    return null; // This component doesn't need to render anything
}

export default Logout;
