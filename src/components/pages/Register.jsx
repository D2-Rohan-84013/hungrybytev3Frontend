import React, { useState } from 'react';
import { registerUser } from '../../api/hungryByteApi';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [registrationType, setRegistrationType] = useState('Customer');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess('');

        try {
            const registrationData = {
                registrationType,
                username,
                password,
                email,
                name,
                phone,
                ...(registrationType === 'Customer' && { isAdmin: false }),
                ...(registrationType === 'RestaurantOwner' && {
                    contactInfo: phone,
                    restaurantName: 'New Restaurant',
                    restaurantAddress: '123 Restaurant St',
                    restaurantCuisineType: 'Italian'
                })
            };

            const result = await registerUser(registrationData);
            setSuccess(result.message);

            // Navigate to the login page after successful registration
            navigate('/login');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="p-4 bg-white rounded shadow-lg" style={{ width: '400px' }}>
                <h2 className="text-center mb-4">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    {registrationType === 'Customer' && (
                        <>
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Phone</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                        </>
                    )}
                    {registrationType === 'RestaurantOwner' && (
                        <>
                            <div className="mb-3">
                                <label className="form-label">Restaurant Name</label>
                                <input type="text" className="form-control" defaultValue="New Restaurant" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Restaurant Address</label>
                                <input type="text" className="form-control" defaultValue="123 Restaurant St" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Cuisine Type</label>
                                <input type="text" className="form-control" defaultValue="Italian" />
                            </div>
                        </>
                    )}
                    <div className="mb-3">
                        <label className="form-label">Registration Type</label>
                        <select
                            className="form-select"
                            value={registrationType}
                            onChange={(e) => setRegistrationType(e.target.value)}
                        >
                            <option value="Customer">Customer</option>
                            <option value="RestaurantOwner">Restaurant Owner</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Register</button>
                </form>
                {error && <div className="alert alert-danger mt-3">{error}</div>}
                {success && <div className="alert alert-success mt-3">{success}</div>}
            </div>
        </div>
    );
}

export default Register;
