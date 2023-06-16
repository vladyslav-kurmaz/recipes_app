import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipes: [],
  recipesLoadingStatus: 'idle',
  showAddNewPopup: false,
  curentFilter: 'all',
  filters: [
    ['all', 'Всі страви'],
    ['first', 'Перші страви'],
    ['second', 'Другі страви'],
    ['salad', 'Салати'],
    ['desserts', 'Десерти']
  ]
}

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    changeRecipesLoading: (state) => {
      state.recipesLoadingStatus = 'loading';
    },
    changeRecipesSuccess: (state, action) => {
      state.recipesLoadingStatus = 'idle';
      state.recipes = action.payload
    },
    changeRecipesError: (state) => {
      state.recipesLoadingStatus = 'error';
    },
    showAddNewRecipesPopup: (state) => {
      state.showAddNewPopup = true;
    },
    closeAddNewRecipesPopup: (state) => {
      state.showAddNewPopup = false;
    },
    changeFilter: (state, action) => {
      state.curentFilter = action.payload
    },
    changeLike: (state, action) => {
      state.recipes.map(item => item._id === action.payload ? item.like = !item.like : item)
    }

  }
})

const {actions, reducer} = recipesSlice;

export default reducer;

export const {
  changeRecipesLoading,
  changeRecipesSuccess,
  changeRecipesError,
  showAddNewRecipesPopup,
  closeAddNewRecipesPopup,
  changeFilter,
  changeLike
} = actions;