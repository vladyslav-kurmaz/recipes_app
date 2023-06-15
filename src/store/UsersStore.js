import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  usersLoadingStatus: 'idle',
  activeId: null,
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
    }

  }
})

const {actions, reducer} = usersSlice;

export default reducer;

export const {
  changeUserStatus,
  changeUserSuccess,
  updateActiveUser
} = actions;