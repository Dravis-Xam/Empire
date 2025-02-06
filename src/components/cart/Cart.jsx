import React from 'react'
import './Cart.css'
import { useSelector } from 'react-redux'
import items from '../../modules/items';

export default function Cart() {

    const isVisible = useSelector((state) => state.visibility.isVisible);

    if (!isVisible) return null;
    
  return (
    <section>
      <h2>Cart</h2>
      {items.map(item => {
        <div key={item.id}>{}</div>
      })}
    </section>
  )
}
