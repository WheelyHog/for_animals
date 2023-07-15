import { configureStore, combineReducers } from '@reduxjs/toolkit'
import categoriesSlice from './reducers/categoriesSlice'
import productListSlice from './reducers/productListSlice'
import subcategoriesSlice from './reducers/subcategoriesSlice'

const rootReducer = combineReducers({
  categories: categoriesSlice,
  subcategories: subcategoriesSlice,
  productList: productListSlice
})

export const store = configureStore({
  reducer: rootReducer
})