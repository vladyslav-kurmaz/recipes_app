import store from "../store/store";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

type status =  'idle' | 'loading' | 'error'
type filters = 'all' | 'first' | 'second' | 'salad' | 'desserts'


export interface IRecipe {
  id: string;
  _id: string;
  title: string;
  like: boolean;
  type: string;
  description: string;
  rating: string;
  image: string;
  ingredients: string[];
  instructions: string[];
}


export interface IRecipesInitialState {
  recipes: IRecipe[] | null;
  recipesLoadingStatus: status;
  showAddNewPopup: boolean;
  curentFilter: filters;
  filters: [
    ['all', 'Всі страви'],
    ['first', 'Перші страви'],
    ['second', 'Другі страви'],
    ['salad', 'Салати'],
    ['desserts', 'Десерти']
  ]
}

interface IUser {
  id: string;
  _id: string;
  name: string;
  lastname: string;
  email: string;
  pass: string;
  likeRecipes: IRecipe[];
  createRecipes: IRecipe[];
}

export interface IUserInitialState {
  user: IUser | null,
  usersLoadingStatus: status,
  activeId: string,
}