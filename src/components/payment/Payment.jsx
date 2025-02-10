import React from 'react'
import "./payment.css"
import { ArrowDown01Icon } from 'lucide-react'

export default function Payment() {
  return (
    <section className='payment-container'>
      <h1>Payment Methods</h1>
      <div>
        <h3>Bank Card</h3>
        <button><ArrowDown01Icon /></button>
      </div>
      <div>
        <h3>Mpesa</h3>
        <button><ArrowDown01Icon /></button>
      </div>
      <div>
        <h3>Payless</h3>
        <button><ArrowDown01Icon /></button>
      </div>
      <div>
        <h3>Paypal</h3>
        <button><ArrowDown01Icon /></button>
      </div>
    </section>
  )
}
