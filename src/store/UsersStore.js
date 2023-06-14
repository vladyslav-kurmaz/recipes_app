import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
  usersLoadingStatus: 'idle',
  activeId: null,
}

const recipesSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    changeUserLoadingStatus: (state, action) => {
      state.usersLoadingStatus = action.payload;
    },
    updateActiveUser: (state, action) => {
      state.activeId = action.payload
    }

  }
})

const {actions, reducer} = recipesSlice();

export default reducer;

export const {
  changeUserLoadingStatus,
  updateActiveUser
} = actions;