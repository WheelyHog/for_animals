import React from 'react'
import s from './Header.module.css'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { get_all_products } from '../../store/reducers/productListSlice';

export default function Header() {

  const data = JSON.parse(localStorage.getItem('products'));

  const dispatch = useDispatch();

  return (
    <div className={s.header}>
      <NavLink to={'/'}>Main Page</NavLink>
      <NavLink to={'/products'} onClick={() => dispatch(get_all_products(data.productList))}>All Products</NavLink>
    </div>
  )
}
