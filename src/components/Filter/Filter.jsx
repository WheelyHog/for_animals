import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import {
  sort_by_default,
  sort_by_price_desc,
  sort_by_price_asc,
  sort_by_name_az,
  sort_by_name_za,
  change_currency,
  searchFilterByKeywords
} from '../../store/reducers/productListSlice';
import PopupWindow from '../PopupWindow/PopupWindow'
import s from './Filter.module.css'

export default function Filter({ pageTitle, productList, currency, setCurrency }) {

  const [menuActive, setMenuActive] = useState(false)
  const [activeBtn, setActiveBtn] = useState(null)
  const [keywords, setKeywords] = useState('')

  const dispatch = useDispatch();

  const handleSortOption = (e) => {
    e.preventDefault();
    switch (e.target.value) {

      case 'default':
        dispatch(sort_by_default(pageTitle))
        break;

      case 'priceDesc':
        dispatch(sort_by_price_desc(pageTitle))
        break

      case 'priceAsc':
        dispatch(sort_by_price_asc(pageTitle))
        break

      case 'name_az':
        dispatch(sort_by_name_az(pageTitle))
        break

      case 'name_za':
        dispatch(sort_by_name_za(pageTitle))
        break

      default:
        break;
    }
  }

  const handleClick = () => {
    setMenuActive(true);
    document.body.style.overflow = 'hidden';
  }

  const changeCurrency = (currency) => {
    let coefficient = 1;
    setActiveBtn(currency);
    if (currency === 'PLN') {
      coefficient = 1;
      setCurrency(currency)
    } else if (currency === 'EUR') {
      coefficient = .22;
      setCurrency(currency)
    } else {
      coefficient = .25
      setCurrency(currency)
    }
    dispatch(change_currency({ currency, coefficient }))
  }

  const renderButton = (currency) => {
    const isActive = activeBtn === currency;
    const buttonClass = isActive ? 'active' : '';

    return (
      <button
        key={currency}
        className={`${buttonClass}`}
        onClick={() => changeCurrency(currency)}
      >
        {currency}
      </button>
    );
  };

  useEffect(() => {
    dispatch(searchFilterByKeywords(keywords))
  }, [keywords])

  const handleKeywords = ({ target }) => {
    setKeywords(target.value)
  }

  return (<div>
    <PopupWindow
      menuActive={menuActive}
      setMenuActive={setMenuActive}
      productList={productList}
    />
    <div className={s.filter_wrapper}>
      <div className={s.add_product}>
        <button className={s.add_product_btn} onClick={handleClick}>Dodaj produkt</button>
      </div>
      <div className={s.filter_sort}>
        <label className={s.filter_sort_title}>Sortowanie</label>
        <select name='sort_by' onInput={handleSortOption}>
          <option value='default'>domyślnie</option>
          <option value='priceDesc'>cena malejąca</option>
          <option value='priceAsc'>cena rosnąca</option>
          <option value='name_az'>wg nazwy A-Z</option>
          <option value='name_za'>wg nazwy Z-A</option>
        </select>
      </div>
      <div className={s.currency}>
        {['PLN', 'USD', 'EUR'].map((buttonId) => renderButton(buttonId))}
      </div>
      <div className={s.search}>
        <input type={'search'} placeholder={'search...'} value={keywords} onChange={handleKeywords} />
      </div>
    </div>
  </div >

  )
}
