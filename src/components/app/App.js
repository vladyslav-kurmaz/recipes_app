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
      <CreateNewRecipes/>
      <Routes>
        <Route exact path='/' element={<MainPage/>}/>
        <Route exact path='/:userId' element={<MainPage/>}/>
        <Route exact path='/login' element={<Login login={true}/>}/>
        <Route exact path='/singup' element={<Login login={false}/>}/>
        <Route exact path='/:userId/myrecipes' element={<MyRecipesPage/>}/>
        <Route exact path='/:userId/:recipesId' element={<RecipesPage/>}/>
        <Route exact path='/recipe/:recipesId' element={<RecipesPage/>}/>
        
        {/* <Route exact path='/:userId/myrecipes/:recipesId' element={<RecipesPage/>}/> */}
        {/* <Route path='/:userId/myrecipes/:recipesId' element={<RecipesPage/>}/> */}
      </Routes>

    </Router>
  );
}

export default App;
