import { createSlice } from "@reduxjs/toolkit";
// import {IUserInitialState} from '../types/interfaces'

const initialState = {
  user: null,
  usersLoadingStatus: 'idle',
  activeId: '',
}

const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeUserStatus: (state, action) => {
      state.usersLoadingStatus = action.payload;
    },
    changeUserSuccess: (state, action) => {
      state.user = action.payload
    },
    updateActiveUser: (state, action) => {
      state.activeId = action.payload
    },
    addLikeRecipes: (state, action) => {
      state.user[0].createRecipes.map(item => item._id === action.payload.id ? item.like = action.payload.like : null)
      if (action.payload.like) {
        state.user[0].likeRecipes.unshift(action.payload)
      } else {
        state.user[0].likeRecipes = state.user[0].likeRecipes.filter(item => item._id !== action.payload._id ? item : null)
      }
    },
    addRecipeInUser: (state, action) => {
      state.user[0].createRecipes.unshift(action.payload)
    }

  }
})

const {actions, reducer} = usersSlice;

export default reducer;

export const {
  changeUserStatus,
  changeUserSuccess,
  updateActiveUser,
  addLikeRecipes,
  addRecipeInUser
} = actions;