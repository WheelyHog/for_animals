import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './CategoryItem.module.css'

export default function CategoryItem({ title, img, chooseCategory }) {
  return (
    <NavLink to={'/products'}>
      <div className={s.category_item} onClick={() => chooseCategory(title)}>
        <img src={img} alt={title} />
        <p>{title}</p>
      </div>
    </NavLink>

  )
}
