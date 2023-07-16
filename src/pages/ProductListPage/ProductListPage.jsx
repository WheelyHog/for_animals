import React, { useState } from 'react'
import Filter from '../../components/Filter/Filter'
import ProductList from '../../components/ProductList/ProductList'

export default function ProductListPage({ productList, pageTitle }) {

  const [currency, setCurrency] = useState('PLN')

  const products = productList.filter(elem => elem.showKeywords && elem.showByCategory)

  return (
    <div className="container">
      <Filter productList={products} currency={currency} setCurrency={setCurrency} />
      <ProductList productList={products} currency={currency} setCurrency={setCurrency} pageTitle={pageTitle} />
    </div>
  );
}
