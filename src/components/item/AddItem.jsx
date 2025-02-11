

// src/components/item/AddItem.jsx

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../features/cart/cartSlice';
import { v4 as uuidv4 } from 'uuid';

function AddToCartButton({ item }) {
    const dispatch = useDispatch();
    const [showMessage, setShowMessage] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);

    const handleAddToCart = () => {
        const cartedItem = {
            ...item,
            id: uuidv4(),
        };
        dispatch(addItemToCart(cartedItem));

        // Clear any existing timeout
        if (timeoutId) clearTimeout(timeoutId);
        
        // Show message and set timeout to hide
        setShowMessage(true);
        setTimeoutId(setTimeout(() => setShowMessage(false), 3000));
    };

    return (
        <div className="add-to-cart-container">
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
                <img
                    src="https://cdn-icons-png.flaticon.com/128/3523/3523885.png"
                    alt="Add to Cart"
                />
            </button>
            
            <div className={`add-to-cart-message ${showMessage ? 'visible' : ''}`}>
                {item.name} has been added to cart!
            </div>
        </div>
    );
}

export default AddToCartButton;