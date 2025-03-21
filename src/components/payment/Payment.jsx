import React, { useState, useEffect } from 'react';
import './payment.css';
import { ChevronDown, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const { cartItems, totalPrice, discount, discountedPrice } = location.state || {
    cartItems: [],
    totalPrice: 0,
    discount: 0,
    discountedPrice: 0,
  };

  const [expandedMethod, setExpandedMethod] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({
    bankCard: { cardNumber: '', expiryDate: '', cvv: '' },
    mpesa: { phoneNumber: '' },
    payless: { voucherCode: '' },
    paypal: { email: '', password: '' },
  });
  const [currency, setCurrency] = useState('USD');
  const [exchangeRates, setExchangeRates] = useState({});
  const [currencySearch, setCurrencySearch] = useState('');
  const [suggestedCurrencies, setSuggestedCurrencies] = useState([]);
  const [convertedPrice, setConvertedPrice] = useState(null);

  // Fetch exchange rates from exchangerate-api
  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const apiKey = import.meta.env.VITE_CURRENCY_CONVERTER_API;
        const response = await fetch(
          `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD` // Fetch rates for USD as base currency
        );
        const data = await response.json();
        if (data.result === 'success') {
          setExchangeRates(data.conversion_rates); // Set the conversion rates
        } else {
          console.error('Failed to fetch exchange rates:', data['error-type']);
        }
      } catch (error) {
        console.error('Failed to fetch exchange rates:', error);
      }
    };
    fetchExchangeRates();
  }, []);

  // Handle currency search
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
  const handleConvertPrice = () => {
    if (convertedPrice === null) {
      const rate = exchangeRates[currency];
      if (rate) {
        const converted = (discountedPrice * rate).toFixed(2);
        setConvertedPrice(converted);
      } else {
        console.error('Invalid currency selected');
      }
    } else {
      setConvertedPrice(null);
      setCurrency('USD');
    }
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

  const handlePayment = async () => {
    console.log('Payment Details:', paymentDetails);

    try {
        const response = await fetch('http://localhost:5000/api/buy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                paymentDetails,
                cartItems,
                userInfo
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Failed to process payment');
        }

        const data = await response.json();
        console.log('Payment processed successfully:', data);

        alert('Payment processed successfully!');
        navigate('/'); // Redirect to the home page
    } catch (error) {
        console.error('Error processing payment:', error);
        alert(error.message || 'Failed to process payment. Please try again.');
    }
};

  return (
    <div className='payment-container-overlay' onClick={() => navigate('/')}>
      <section
        className='payment-container'
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={() => navigate('/')}>
          <X size={24} />
        </button>
        <h1>Payment Methods</h1>

        {/* Cart Summary */}
        <div className="cart-summary">
          <h3>Cart Summary</h3>
          <p>Number of Items: {cartItems?.length}</p>
          <p>Total Price (USD): {totalPrice?.toFixed(2)}</p>
          {discount > 0 && <p>Discount: {discount}%</p>}
          <p>
            Discounted Price ({currency}): 
            {convertedPrice === null ? discountedPrice.toFixed(2) : convertedPrice}
          </p>

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
            <button onClick={handleConvertPrice} className='convert-curr-btn'>
              {convertedPrice === null ? 'Convert' : 'Reset'}
            </button>
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
                    type="date"
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
        >
          Complete Purchase
        </button>  
      </section>
    </div>
  );
}