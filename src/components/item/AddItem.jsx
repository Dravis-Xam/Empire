import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../features/cart/cartSlice';
import { v4 as uuidv4 } from 'uuid';

function AddToCartButton({ item }) {
  const dispatch = useDispatch();
  const [showMessage, setShowMessage] = useState(false);
  const [showQuantityPopup, setShowQuantityPopup] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [timeoutId, setTimeoutId] = useState(null);

  const handleAddToCart = () => {
    const cartedItem = {
      ...item,
      id: uuidv4(),
      quantity: quantity, // Include the selected quantity
    };
    dispatch(addItemToCart(cartedItem));

    // Clear any existing timeout
    if (timeoutId) clearTimeout(timeoutId);

    // Show message and set timeout to hide
    setShowMessage(true);
    setTimeoutId(setTimeout(() => setShowMessage(false), 3000));

    // Close the quantity popup
    setShowQuantityPopup(false);
  };

  return (
    <div className="add-to-cart-container">
      <button
        className="add-to-cart-btn"
        onClick={() => setShowQuantityPopup(true)}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/128/3523/3523885.png"
          alt="Add to Cart"
        />
      </button>

      {/* Quantity Popup */}
      {showQuantityPopup && (
        <div className="quantity-popup-overlay">
          <div className="quantity-popup">
            <div className="quantity-popup-content">
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                min="1"
                onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
              />
              <div className="quantity-popup-buttons">
                <button onClick={handleAddToCart}>Add</button>
                <button onClick={() => setShowQuantityPopup(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Message */}
      <div className={`add-to-cart-message ${showMessage ? 'visible' : ''}`}>
        {item.name} has been added to cart!
      </div>
    </div>
  );
}

export default AddToCartButton;