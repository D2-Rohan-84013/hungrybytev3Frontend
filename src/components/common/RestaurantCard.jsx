import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function RestaurantCard({ restaurant }) {
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <div className="card">
            <img
                src={imageError ? 'placeholder-image-url.jpg' : restaurant.imageUrl}
                className="card-img-top"
                alt={restaurant.name}
                onError={handleImageError}
            />
            <div className="card-body">
                <h5 className="card-title">{restaurant.name}</h5>
                <p className="card-text">{restaurant.cuisineType}</p>
                {/* <Rating rating={restaurant.averageRating} /> Comment out or remove this line for now */}
                <p className="card-text">{restaurant.address}</p>
                <Link to={`/restaurant/${restaurant.id}/menu`} className="btn btn-primary">
                    View Menu
                </Link>
            </div>
        </div>
    );
}

export default RestaurantCard;
