import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMenuItemsByRestaurantId } from '../../api/hungryByteApi'; // Make sure this function matches your API call
import LoadingSpinner from '../common/LoadingSpinner';
import MenuItemCard from '../common/MenuItemCard';

function Menu() {
    const { id } = useParams(); // Get restaurant ID from URL params
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getMenuItemsByRestaurantId(id); // Fetch menu items for the restaurant
                if (response && response.$values && Array.isArray(response.$values)) {
                    setMenuItems(response.$values);
                } else {
                    throw new Error('Invalid data format');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleAddToCart = (menuItem) => {
        // Placeholder for add to cart functionality
        console.log('Add to cart:', menuItem);
    };

    return (
        <div>
            <h2>Menu for Restaurant {id}</h2>

            {loading && <LoadingSpinner />}
            {error && <div className="alert alert-danger">{error}</div>}

            {menuItems.length > 0 ? (
                <div className="row">
                    {menuItems.map((item) => (
                        <div key={item.id} className="col-md-4 mb-4">
                            <MenuItemCard menuItem={item} onAddToCart={handleAddToCart} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="alert alert-warning">No menu items available</div>
            )}
        </div>
    );
}

export default Menu;
