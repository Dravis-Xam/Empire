import React from 'react'
import './Cart.css'

export default function Cart() {

    const items = []


  return (
    <section>
      {items.map(item => {
        <div key={item.id}>{}</div>
      })}
    </section>
  )
}
