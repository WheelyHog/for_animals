import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import ProductList from './components/ProductList/ProductList';
import { get_all_products } from './store/reducers/productListSlice';
import { data } from './store/data';
import Filter from './components/Filter/Filter';
import { get_categories } from './store/reducers/categoriesSlice';
import { get_subcategories } from './store/reducers/subcategoriesSlice';

function App() {
  const dispatch = useDispatch()

  const [currency, setCurrency] = useState('PLN')

  useEffect(() => {
    dispatch(get_all_products(data))
    dispatch(get_categories(data))
    dispatch(get_subcategories(data))
  }, [dispatch])

  const productList = useSelector(state => state.productList.productList)
  const pageTitle = useSelector(state => state.productList.pageTitle)

  return (
    <div className="container">
      <Filter pageTitle={pageTitle} productList={productList} currency={currency} setCurrency={setCurrency} />
      <ProductList productList={productList} pageTitle={pageTitle} currency={currency} setCurrency={setCurrency} />
    </div>
  );
}

export default App;
