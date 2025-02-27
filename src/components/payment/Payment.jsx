import React, { useState, useEffect } from 'react';
import './payment.css';
import { ChevronDown, X } from 'lucide-react';

export default function Payment({ onClose, cart }) {
  const [expandedMethod, setExpandedMethod] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({
    bankCard: { cardNumber: '', expiryDate: '', cvv: '' },
    mpesa: { phoneNumber: '' },
    payless: { voucherCode: '' },
    paypal: { email: '', password: '' },
  });
  const [currency, setCurrency] = useState('USD'); // Default currency
  const [exchangeRates, setExchangeRates] = useState({});
  const [currencySearch, setCurrencySearch] = useState('');
  const [suggestedCurrencies, setSuggestedCurrencies] = useState([]);

  // Extract cart items and discount from the cart prop
  const cartItems = cart?.items || [];
  const cartDiscount = cart?.discount || 0;

  // Calculate total price and discounted price
  const totalPriceUSD = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const discountedPrice = totalPriceUSD * (1 - cartDiscount / 100);

  // Fetch exchange rates from FastForex API
  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const apiKey = import.meta.env.VITE_CURRENCY_CONVERTER_API; // Access environment variable
        const response = await fetch(
          `https://api.fastforex.io/fetch-all?api_key=${apiKey}`
        );
        const data = await response.json();
        setExchangeRates(data.results); // FastForex returns rates in `results` object
      } catch (error) {
        console.error('Failed to fetch exchange rates:', error);
      }
    };
    fetchExchangeRates();
  }, []);

  // Handle currency search and suggestions
  useEffect(() => {
    if (currencySearch) {
      const filteredCurrencies = Object.keys(exchangeRates).filter((curr) =>
        curr.toLowerCase().includes(currencySearch.toLowerCase())
      );
      setSuggestedCurrencies(filteredCurrencies);
    } else {
      setSuggestedCurrencies([]);
    }
  }, [currencySearch, exchangeRates]);

  // Convert price to selected currency
  const convertPrice = (price) => {
    return (price * exchangeRates[currency]).toFixed(2);
  };

  const toggleMethod = (method) => {
    setExpandedMethod(expandedMethod === method ? null : method);
  };

  const handleInputChange = (method, field, value) => {
    setPaymentDetails({
      ...paymentDetails,
      [method]: {
        ...paymentDetails[method],
        [field]: value,
      },
    });
  };

  const handlePayment = () => {
    console.log('Payment Details:', paymentDetails);
    alert('Payment processed successfully!');
    onClose();
  };

  return (
    <div className='payment-container-overlay'>
      <section className='payment-container'>
        <button className="close-btn" onClick={onClose}>
          <X size={24} />
        </button>
        <h1>Payment Methods</h1>

        {/* Cart Summary */}
        <div className="cart-summary">
          <h3>Cart Summary</h3>
          <p>Number of Items: {cartItems.length}</p>
          <p>Total Price (USD): ${totalPriceUSD.toFixed(2)}</p>
          {cartDiscount > 0 && <p>Discount: {cartDiscount}%</p>}
          <p>Discounted Price (USD): ${discountedPrice.toFixed(2)}</p>

          {/* Currency Conversion */}
          <div className="currency-converter">
            <label htmlFor="currency">Convert to:</label>
            <input
              type="text"
              id="currency"
              placeholder="Search currency (e.g., EUR, GBP)"
              value={currencySearch}
              onChange={(e) => setCurrencySearch(e.target.value)}
            />
            {suggestedCurrencies.length > 0 && (
              <ul className="currency-suggestions">
                {suggestedCurrencies.map((curr) => (
                  <li key={curr} onClick={() => { setCurrency(curr); setCurrencySearch(''); }}>
                    {curr}
                  </li>
                ))}
              </ul>
            )}
            <p>Converted Price ({currency}): {convertPrice(discountedPrice)}</p>
          </div>
        </div>

        {/* Payment Methods */}
        {['Bank Card', 'Mpesa', 'Payless', 'Paypal'].map((method) => (
          <div key={method} className="payment-method-container">
            <div className="method-header">
              <h3>{method}</h3>
              <button
                className={`toggle-btn ${expandedMethod === method ? 'expanded' : ''}`}
                onClick={() => toggleMethod(method)}
                aria-expanded={expandedMethod === method}
              >
                <ChevronDown size={20} />
              </button>
            </div>
            <div className={`p-contents ${expandedMethod === method ? 'visible' : ''}`}>
              {method === 'Bank Card' && (
                <div className="payment-details">
                  <input
                    type="text"
                    placeholder="Card Number"
                    value={paymentDetails.bankCard.cardNumber}
                    onChange={(e) => handleInputChange('bankCard', 'cardNumber', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Expiry Date"
                    value={paymentDetails.bankCard.expiryDate}
                    onChange={(e) => handleInputChange('bankCard', 'expiryDate', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    value={paymentDetails.bankCard.cvv}
                    onChange={(e) => handleInputChange('bankCard', 'cvv', e.target.value)}
                  />
                </div>
              )}
              {method === 'Mpesa' && (
                <div className="payment-details">
                  <input
                    type="text"
                    placeholder="Phone Number"
                    value={paymentDetails.mpesa.phoneNumber}
                    onChange={(e) => handleInputChange('mpesa', 'phoneNumber', e.target.value)}
                  />
                </div>
              )}
              {method === 'Payless' && (
                <div className="payment-details">
                  <input
                    type="text"
                    placeholder="Voucher Code"
                    value={paymentDetails.payless.voucherCode}
                    onChange={(e) => handleInputChange('payless', 'voucherCode', e.target.value)}
                  />
                </div>
              )}
              {method === 'Paypal' && (
                <div className="payment-details">
                  <input
                    type="email"
                    placeholder="Email"
                    value={paymentDetails.paypal.email}
                    onChange={(e) => handleInputChange('paypal', 'email', e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={paymentDetails.paypal.password}
                    onChange={(e) => handleInputChange('paypal', 'password', e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>
        ))}

        <button 
          className='complete_purchase'
          onClick={handlePayment}
        >Complete Purchase</button>  
      </section>
    </div>
  );
}

Payment.defaultProps = {
  cart: {
    items: [],
    discount: 0,
  },
};