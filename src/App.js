import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { get_all_products } from './store/reducers/productListSlice';
import { data } from './store/data';
import { get_categories } from './store/reducers/categoriesSlice';
import { get_subcategories } from './store/reducers/subcategoriesSlice';
import Header from './components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import ProductListPage from './pages/ProductListPage/ProductListPage';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(get_all_products(data))
    dispatch(get_categories(data))
    dispatch(get_subcategories(data))
  }, [dispatch])

  const productList = useSelector(state => state.productList.productList)
  const pageTitle = useSelector(state => state.productList.pageTitle)

  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path='/*' element={<HomePage />} />
        <Route path='/products' element={<ProductListPage productList={productList} pageTitle={pageTitle} />} />
      </Routes>
    </div>
  );
}

export default App;
