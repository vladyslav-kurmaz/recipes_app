import { createSlice } from "@reduxjs/toolkit";
import { IRecipesInitialState } from '../types/interfaces';

const initialState: IRecipesInitialState = {
  recipes: null,
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
      state.recipes?.map(item => item._id === action.payload ? item.like = !item.like : item)
    },
    addRecipeInAllRecipes: (state, action) => {
      state.recipes?.push(action.payload)
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
  changeLike,
  addRecipeInAllRecipes
} = actions;