import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Cart.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  removeItemFromCart,
  removeMultipleItemsFromCart,
  clearCart,
} from '../../features/cart/cartSlice';
import { toggleVisibility } from '../../features/visibility/visibilitySlice';
import { X } from 'lucide-react';

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isVisible = useSelector((state) => state.visibility.isVisible);
  const cartItems = useSelector((state) => state.cart.items);
  const [selectedItems, setSelectedItems] = useState([]);

  const cartRef = useRef(null);

  // Handle click outside the cart
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        dispatch(toggleVisibility());
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible, dispatch]);

  // Handle drag-and-drop functionality
  useEffect(() => {
    const cart = cartRef.current;
    if (!cart) return; // Ensure cartRef is valid

    const header = cart.querySelector('.cart-header');
    if (!header) return; // Ensure header is valid

    let isDragging = false;
    let offsetX, offsetY;

    const handleMouseDown = (e) => {
      isDragging = true;
      offsetX = e.clientX - cart.getBoundingClientRect().left;
      offsetY = e.clientY - cart.getBoundingClientRect().top;
      cart.style.cursor = 'grabbing';
    };

    const handleTouchStart = (e) => {
      isDragging = true;
      offsetX = e.touches[0].clientX - cart.getBoundingClientRect().left;
      offsetY = e.touches[0].clientY - cart.getBoundingClientRect().top;
      cart.style.cursor = 'grabbing';
    };

    const handleMouseMove = (e) => {
      if (isDragging) {
        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;
        cart.style.left = `${x}px`;
        cart.style.top = `${y}px`;
      }
    };

    const handleTouchMove = (e) => {
      if (isDragging) {
        const x = e.touches[0].clientX - offsetX;
        const y = e.touches[0].clientY - offsetY;
        cart.style.left = `${x}px`;
        cart.style.top = `${y}px`;
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
      cart.style.cursor = 'grab';
    };

    const handleTouchEnd = () => {
      isDragging = false;
      cart.style.cursor = 'grab';
    };

    header.addEventListener('mousedown', handleMouseDown);
    header.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      header.removeEventListener('mousedown', handleMouseDown);
      header.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  if (!isVisible) return null;

  const toggleSelection = useCallback((itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  }, []);

  const deleteSelected = useCallback(() => {
    dispatch(removeMultipleItemsFromCart(selectedItems));
    setSelectedItems([]);
  }, [dispatch, selectedItems]);

  const deleteAll = useCallback(() => {
    dispatch(clearCart());
    setSelectedItems([]);
  }, [dispatch]);

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => {
    const price = parseFloat(item.price);
    const quantity = parseInt(item.quantity, 10) || 1; // Default to 1 if quantity is invalid
    return total + (isNaN(price) ? 0 : price) * quantity;
  }, 0);

  // Apply 10% discount if total price is above 5000
  const discount = totalPrice > 5000 ? 10 : 0;
  const discountedPrice = totalPrice * (1 - discount / 100);

  // Handle opening payment and closing cart
  const handleCompletePurchase = () => {
    dispatch(toggleVisibility()); // Close the cart
    navigate('/payment', { state: { cartItems, totalPrice, discount, discountedPrice } }); // Navigate to Payment with cart data
  };

  return (
    <>
      {/* Overlay */}
      <div className="cart-overlay" onClick={() => dispatch(toggleVisibility())} />

      {/* Cart Container */}
      <section className="cart" ref={cartRef}>
        <div className="cart-header">
          <h2>Cart</h2>
          <button
            className="close-btn"
            onClick={() => dispatch(toggleVisibility())}
            aria-label="Close cart"
          >
            <X />
          </button>
        </div>

        <div className="info-cart">
          {selectedItems.length > 0
            ? `Selected ${selectedItems.length} of ${cartItems.length} items`
            : `You have ${cartItems.length} items in your cart`}
        </div>

        {/* Cart Items */}
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
              <span>${parseFloat(item.price).toFixed(2)}</span>
              <button
                className="delete-item-btn"
                onClick={() => dispatch(removeItemFromCart(item.id))}
              >
                🗑️
              </button>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="cart-summary">
          <p>Total Price: ${totalPrice.toFixed(2)}</p>
          {discount > 0 && (
            <p>
              Discount ({discount}%): -${(totalPrice - discountedPrice).toFixed(2)}
            </p>
          )}
          <p>Final Price: ${discountedPrice.toFixed(2)}</p>
        </div>

        {/* Bulk Actions */}
        {cartItems.length > 0 && (
          <div className="bulk-actions">
            <button
              className="toPayment-btn"
              onClick={handleCompletePurchase}
            >
              Complete
            </button>
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
    </>
  );
}