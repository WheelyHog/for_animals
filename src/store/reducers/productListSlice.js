import { createSlice } from '@reduxjs/toolkit'

const productListSlice = createSlice({
  name: 'productList',
  initialState: {
    pageTitle: '',
    productList: []
  },
  reducers: {
    get_all_products(state, action) {
      const newstate = {
        ...state, pageTitle: 'Wszystkie towary', productList: action.payload.map(elem => {
          return { ...elem, base_price: elem.price }
        })
      }
      return { ...newstate }
      // return { ...state, pageTitle: 'Wszystkie towary', productList: action.payload }
    },
    sort_by_default(state, action) {
      return { state, pageTitle: action.payload, productList: [...state.productList].sort((a, b) => a.id - b.id) }
    },
    sort_by_price_desc(state, action) {
      return { ...state, pageTitle: action.payload, productList: [...state.productList].sort((a, b) => (b.discont_price ? b.discont_price : b.price) - (a.discont_price ? a.discont_price : a.price)) }
    },
    sort_by_price_asc(state, action) {
      return { ...state, pageTitle: action.payload, productList: [...state.productList].sort((a, b) => (a.discont_price ? a.discont_price : a.price) - (b.discont_price ? b.discont_price : b.price)) }
    },

    sort_by_name_az(state, action) {
      return { ...state, pageTitle: action.payload, productList: [...state.productList].sort((a, b) => a.title.localeCompare(b.title)) }
    },

    sort_by_name_za(state, action) {
      return { ...state, pageTitle: action.payload, productList: [...state.productList].sort((a, b) => b.title.localeCompare(a.title)) }
    },

    add_product(state, action) {
      console.log(action.payload)
      return { ...state, pageTitle: 'Wszystkie towary', productList: [...state.productList, action.payload] }
    },

    change_currency(state, action) {
      console.log(action.payload)
      const newstate = {
        ...state,
        productList: state.productList.map(elem => {
          return { ...elem, price: (elem.base_price * action.payload.coefficient).toFixed(2) }
        })
      }
      return newstate
    }
  }
})

export default productListSlice.reducer;
export const { get_all_products, sort_by_default, sort_by_price_desc, sort_by_price_asc, sort_by_name_az, sort_by_name_za, add_product, change_currency } = productListSlice.actions;