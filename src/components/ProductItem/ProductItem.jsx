import React from 'react'
import s from './ProductItem.module.css'

export default function ProductItem({ title, price, discount, image, currency }) {

  const discount_price = (price - (price * discount) / 100).toFixed(2)

  return (
    <div className={s.product_item}>
      <div className={s.product_img}>
        <img src={image} alt={title} />
      </div>
      <h2 className={s.product_title}>{title}</h2>
      <div className={s.price_container}>
        <p className={s.price}>{discount ? discount_price : price} {currency}</p>
        {discount && <p className={s.discount}>{price} {currency}</p>}
      </div>
    </div>
  )
}
