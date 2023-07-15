import { createSlice } from '@reduxjs/toolkit'

const subcategoriesSlice = createSlice({
  name: 'subcategories',
  initialState: [],
  reducers: {

    get_subcategories(state, action) {
      const newState = []
      for (let i = 0; i < action.payload.length; i++) {
        if (!newState.includes(action.payload[i].subcategory)) {
          newState.push(action.payload[i].subcategory)
        }
      }
      return newState
    }
  }
})

export default subcategoriesSlice.reducer;
export const { get_subcategories } = subcategoriesSlice.actions;