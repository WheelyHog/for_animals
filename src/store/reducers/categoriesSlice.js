import { createSlice } from '@reduxjs/toolkit'

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: [],
  reducers: {
    get_categories(state, action) {
      const newState = []
      for (let i = 0; i < action.payload.length; i++) {
        if (!newState.includes(action.payload[i].category)) {
          newState.push(action.payload[i].category)
        }
      }
      return newState
    }
  }
})

export default categoriesSlice.reducer;
export const { get_categories } = categoriesSlice.actions;