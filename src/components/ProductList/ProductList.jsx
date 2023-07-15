import React from 'react'
import s from './ProductList.module.css'
import ProductItem from '../ProductItem/ProductItem'

export default function ProductList({ pageTitle, productList, currency }) {
  return (
    <div className={s.page_container}>
      <h1>{pageTitle}</h1>
      <div className={s.productlist}>
        {productList.map((elem, index) => <ProductItem key={index} {...elem} currency={currency} />)}
      </div>
    </div>
  )
}
