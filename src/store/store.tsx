import { configureStore } from "@reduxjs/toolkit";
import recipes from './RecipesStore';
import user from './UsersStore';

const store = configureStore({
    reducer: {recipes, user},
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production'
})

export default store;