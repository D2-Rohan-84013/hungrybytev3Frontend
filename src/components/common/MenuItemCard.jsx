import React from 'react';
import { Card, Button } from 'react-bootstrap';

function MenuItemCard({ menuItem, onAddToCart }) {

    return (
        <Card>
            <Card.Img variant="top" src={menuItem.imageUrl || 'https://via.placeholder.com/150'} alt={menuItem.name} />
            <Card.Body>
                <Card.Title>{menuItem.name}</Card.Title>
                <Card.Text>{menuItem.description}</Card.Text>
                <Card.Text>Price: ${menuItem.price.toFixed(2)}</Card.Text>
                <Button variant="primary" onClick={() => onAddToCart(menuItem)}>Add to Cart</Button>
            </Card.Body>
        </Card>
    );
}

export default MenuItemCard;
