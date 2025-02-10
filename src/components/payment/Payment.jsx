import React from 'react'
import "./payment.css"
import { ChevronDown } from 'lucide-react'

export default function Payment() {
  return (
    <section className='payment-container'>
      <button></button>
      <h1>Payment Methods</h1>
      <div className = "payment-method-container">
        <h3>Bank Card</h3>
        <button><ChevronDown /></button>
      </div>
      <div className = "payment-method-container">
        <h3>Mpesa</h3>
        <button><ChevronDown /></button>
      </div>
      <div className = "payment-method-container">
        <h3>Payless</h3>
        <button><ChevronDown /></button>
      </div>
      <div className = "payment-method-container">
        <h3>Paypal</h3>
        <button><ChevronDown /></button>
      </div>
    </section>
  )
}
