import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllRestaurants } from '../../api/hungryByteApi';
import LoadingSpinner from '../common/LoadingSpinner';
import RestaurantCard from '../common/RestaurantCard';

function RestaurantList() {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAllRestaurants();

                // Check if the result is an object with a $values property
                if (result && Array.isArray(result.$values)) {
                    setRestaurants(result.$values);
                } else {
                    throw new Error('Unexpected data format');
                }
            } catch (err) {
                setError('Failed to load restaurants: ' + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container mt-5">
            <h2>Restaurants</h2>

            {loading && <LoadingSpinner />}
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="row">
                {restaurants.length > 0 ? (
                    restaurants.map(restaurant => (
                        <div className="col-md-4 mb-4" key={restaurant.id}>
                            <RestaurantCard restaurant={restaurant} />
                        </div>
                    ))
                ) : (
                    !loading && <div className="alert alert-warning">No restaurants available</div>
                )}
            </div>
        </div>
    );
}

export default RestaurantList;
