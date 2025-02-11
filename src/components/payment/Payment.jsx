import React, { useState } from 'react';
import './payment.css';
import { ChevronDown, X } from 'lucide-react';

export default function Payment({ onClose }) {
  const [expandedMethod, setExpandedMethod] = useState(null);

  const toggleMethod = (method) => {
    setExpandedMethod(expandedMethod === method ? null : method);
  };

  return (
    <div className='payment-container-overlay'>
      <section className='payment-container'>
        <button className="close-btn" onClick={onClose}>
          <X size={24} />
        </button>
        <h1>Payment Methods</h1>

        {['Bank Card', 'Mpesa', 'Payless', 'Paypal'].map((method) => (
          <div key={method} className="payment-method-container">
            <div className="method-header">
              <h3>{method}</h3>
              <button
                className={`toggle-btn ${expandedMethod === method ? 'expanded' : ''}`}
                onClick={() => toggleMethod(method)}
              >
                <ChevronDown size={20} />
              </button>
            </div>
            <div className={`p-contents ${expandedMethod === method ? 'visible' : ''}`}>
              {/* Add payment method details here */}
              {method} payment details go here.
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}