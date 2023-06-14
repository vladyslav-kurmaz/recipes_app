import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from '../header/Header';
import MainPage from '../../pages/MainPage';
import Login from '../login/Login';
import MyRecipesPage from '../../pages/MyRecipesPage';
import RecipesPage from '../../pages/RecipesPage';
import CreateNewRecipes from '../createNewRecipes/CreateNewRecipes';

import './App.scss';

function App() {
  return (
    <Router>
      <Header/>
      {/* <CreateNewRecipes/> */}
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/login' element={<Login login={true}/>}/>
        <Route path='/singup' element={<Login login={false}/>}/>
        <Route path='/myrecipes' element={<MyRecipesPage/>}/>
        <Route path='/:recipesId' element={<RecipesPage/>}/>
        <Route path='/myrecipes/:recipesId' element={<RecipesPage/>}/>
      </Routes>

    </Router>
  );
}

export default App;
