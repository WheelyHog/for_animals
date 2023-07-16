import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { get_categories } from '../../store/reducers/categoriesSlice'
import { get_all_products, get_category_products } from '../../store/reducers/productListSlice'
import { get_subcategories } from '../../store/reducers/subcategoriesSlice'
import s from './HomePage.module.css'
import CategoryItem from '../../components/CategoryItem/CategoryItem'

export default function HomePage() {
  const category_images = [
    'https://ae01.alicdn.com/kf/S91e3cf0a5b7640d39f03708f980b05bdn.jpg',
    'https://rem-stroitelstvo.ru/wp-content/uploads/2016/09/domik.jpg',
    'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'
  ]
  const dispatch = useDispatch()

  const data = JSON.parse(localStorage.getItem('products'));

  useEffect(() => {
    dispatch(get_all_products(data.productList))
    dispatch(get_categories(data.productList))
    dispatch(get_subcategories(data.productList))
  }, [dispatch])

  const categoriesList = useSelector(state => state.categories)

  const chooseCategory = (category) => {
    dispatch(get_category_products(category))
  }

  return (
    <div className={s.wrapper}>
      <h1>Domki dla zwierząt</h1>
      <div className={s.categories_list}>
        {categoriesList.map((elem, index) => {
          if (elem === 'na_drzewie') {
            return <CategoryItem key={index} title={elem} img={category_images[0]} chooseCategory={chooseCategory} />
          } else if (elem === 'na_ziemi') {
            return <CategoryItem key={index} title={elem} img={category_images[1]} chooseCategory={chooseCategory} />
          } else return <CategoryItem key={index} title={elem} img={category_images[2]} chooseCategory={chooseCategory} />
        })}
      </div>
    </div>

  )
}
