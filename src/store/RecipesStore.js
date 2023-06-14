import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipes: [],
  recipesLoadingStatus: 'idle',

}

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    changeRecipesLoadingStatus: (state, action) =>{
      state.recipesLoadingStatus = action.payload;
    }
  }
})

const {actions, reducer} = recipesSlice();

export default reducer;

export const {
  changeRecipesLoadingStatus
} = actions;