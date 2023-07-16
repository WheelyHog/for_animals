import { createSlice } from '@reduxjs/toolkit'

const storage = JSON.parse(localStorage.getItem('products'));
const updateLocalStorage = (tempState) => localStorage.setItem('products', JSON.stringify(tempState))


const productListSlice = createSlice({
  name: 'productList',
  initialState: storage ? storage : {
    pageTitle: '',
    productList: []
  },
  reducers: {
    get_all_products(state, action) {
      console.log(action.payload)
      const newState = {
        ...state, pageTitle: 'Wszystkie towary', productList: action.payload.map(elem => {
          return { ...elem, base_price: elem.price, showByCategory: true, showKeywords: true }
        })
      }
      updateLocalStorage({ ...newState })
      return { ...newState }
    },

    get_category_products(state, action) {
      const newState = {
        ...state, pageTitle: `Category: ${action.payload}`, productList: state.productList.map(elem => {
          if (elem.category === action.payload) {
            return { ...elem, showByCategory: true }
          } else return { ...elem, showByCategory: false }
        })
      }
      return { ...newState }
    },

    sort_by_default(state, action) {
      const newState = { ...state, pageTitle: action.payload, productList: [...state.productList].sort((a, b) => a.id - b.id) };
      return { ...newState }
    },

    sort_by_price_desc(state, action) {
      const newState = { ...state, pageTitle: action.payload, productList: [...state.productList].sort((a, b) => (b.discont_price ? b.discont_price : b.price) - (a.discont_price ? a.discont_price : a.price)) };
      return { ...newState }
    },

    sort_by_price_asc(state, action) {
      const newState = { ...state, pageTitle: action.payload, productList: [...state.productList].sort((a, b) => (a.discont_price ? a.discont_price : a.price) - (b.discont_price ? b.discont_price : b.price)) };
      return { ...newState }
    },

    sort_by_name_az(state, action) {
      const newState = { ...state, pageTitle: action.payload, productList: [...state.productList].sort((a, b) => a.title.localeCompare(b.title)) };
      return { ...newState }
    },

    sort_by_name_za(state, action) {
      const newState = { ...state, pageTitle: action.payload, productList: [...state.productList].sort((a, b) => b.title.localeCompare(a.title)) };
      return { ...newState }
    },

    add_product(state, action) {
      const newState = { ...state, pageTitle: 'Wszystkie towary', productList: [...state.productList, action.payload] };
      updateLocalStorage({ ...newState })
      return { ...newState }
    },

    change_currency(state, action) {
      console.log(action.payload)
      const newState = {
        ...state,
        productList: state.productList.map(elem => {
          return { ...elem, price: (elem.base_price * action.payload.coefficient).toFixed(2) }
        })
      }
      return { ...newState }
    },

    searchFilterByKeywords(state, action) {
      console.log(action.payload)
      const newState = {
        ...state, productList: [...state.productList].map(elem => {
          if (elem.title.toLowerCase().startsWith(action.payload.toLowerCase())) {
            return { ...elem, showKeywords: true }
          } else {
            return { ...elem, showKeywords: false }
          }
        })
      }
      return { ...newState }
    }
  }
})

export default productListSlice.reducer;
export const {
  get_all_products, sort_by_default, sort_by_price_desc, sort_by_price_asc,
  sort_by_name_az, sort_by_name_za, add_product, change_currency,
  get_category_products, searchFilterByKeywords } = productListSlice.actions;