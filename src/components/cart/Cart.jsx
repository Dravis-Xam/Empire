import React, { useState, useEffect, useRef } from 'react';
import './Cart.css';
import { useSelector, useDispatch } from 'react-redux';
import {
    removeItemFromCart,
    removeMultipleItemsFromCart,
    clearCart,
} from './cartSlice';
import { toggleVisibility } from '../header/visibilitySlice';

export default function Cart() {
    const dispatch = useDispatch();
    const isVisible = useSelector((state) => state.visibility.isVisible);
    const cartItems = useSelector((state) => state.cart.items);
    const [selectedItems, setSelectedItems] = useState([]);

    // Reference to the cart container
    const cartRef = useRef(null);

    // Close cart when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (cartRef.current && !cartRef.current.contains(event.target)) {
                dispatch(toggleVisibility()); // Close the cart
            }
        };

        // Attach the event listener
        if (isVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        // Clean up the event listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isVisible, dispatch]);

    if (!isVisible) return null; // Hide the cart if it's not visible

    const toggleSelection = (itemId) => {
        setSelectedItems((prev) =>
            prev.includes(itemId)
                ? prev.filter((id) => id !== itemId)
                : [...prev, itemId]
        );
    };

    const deleteSelected = () => {
        dispatch(removeMultipleItemsFromCart(selectedItems));
        setSelectedItems([]);
    };

    const deleteAll = () => {
        dispatch(clearCart());
        setSelectedItems([]);
    };

    return (
        <section className="cart" ref={cartRef}>
            <div className="cart-header">
                <h2>Cart</h2>
                <button 
                    className="close-btn"
                    onClick={() => dispatch(toggleVisibility())}
                    aria-label="Close cart"
                >
                    ×
                </button>
            </div>
            <div className="info-cart">
                {selectedItems.length > 0
                    ? `Selected ${selectedItems.length} of ${cartItems.length} items`
                    : `You have ${cartItems.length} items in your cart`}
            </div>

            <div className="cart-items">
                {cartItems.map((item) => (
                    <div key={item.id} className="cart-item">
                        <input
                            type="checkbox"
                            checked={selectedItems.includes(item.id)}
                            onChange={() => toggleSelection(item.id)}
                            className="item-checkbox"
                        />
                        <span>{item.name}</span>
                        <span>${item.price}</span>
                        <button
                            className="delete-item-btn"
                            onClick={() => dispatch(removeItemFromCart(item.id))}
                        >
                            🗑️
                        </button>
                    </div>
                ))}
            </div>
            
            {cartItems.length > 0 && <button className='toPayment-btn'> Complete </button>}
            

            {cartItems.length > 0 && (
                <div className="bulk-actions">
                    <button
                        className="delete-btn"
                        onClick={deleteSelected}
                        disabled={selectedItems.length === 0}
                    >
                        Delete Selected ({selectedItems.length})
                    </button>
                    <button className="delete-all-btn" onClick={deleteAll}>
                        Delete All
                    </button>
                </div>
            )}
        </section>
    );
}