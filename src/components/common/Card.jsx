import React from 'react';
import { Link } from 'react-router-dom';

function Card({ title, imageUrl, description }) {
    return (
        <div className="card">
            <img src={imageUrl} className="card-img-top" alt={title} />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <Link to={`/restaurant/${title}`} className="btn btn-primary">View Menu</Link>
            </div>
        </div>
    );
}

export default Card;
