import { useEffect } from "react";
import RecipesItem from "../recipesItem/RecipesItem";
import RecipesService from "../../service/RecipesService";
import { useDispatch, useSelector } from "react-redux";
import {changeRecipesLoading, changeRecipesSuccess, changeRecipesError, showAddNewRecipesPopup} from '../../store/RecipesStore'
import Spinner from "../spiner/spiner";

import recipeIcon from '../../image/recipe.webp'

import './RecipesList.scss';

const RecipesList = () => {
  const {getAllRecipes} = RecipesService();
  const dispatch = useDispatch();
  const {recipes, curentFilter} = useSelector(store => store.recipes);
  const {activeId} = useSelector(store => store.user);

  useEffect(() => {
    dispatch(changeRecipesLoading())
    getAllRecipes()
      .then(recipes => dispatch(changeRecipesSuccess(recipes)))
      .catch(dispatch(changeRecipesError()))
    // eslint-disable-next-line 
  }, [])

  const openPopup = () => {
    document.body.style.cssText = `
      overflow-y: hidden;
    `
    dispatch(showAddNewRecipesPopup())
  }

  const renderRecipes = () => {

    const visibleData = () => {
      if (curentFilter === 'all') {
        return recipes;
      }
      return recipes.filter(item => item.type === curentFilter);
    }

    return  visibleData().length === 0 ? 
      <div className="dont__recipes">
        <h2 className="dont__recipes-title">У цій категорії ще нема рецептів</h2>
        <img src={recipeIcon} alt='recipe icon'  className="dont__recipes-icon"/>
        {activeId ? <button 
            className='dont__recipes-item-create'
            onClick={openPopup}>Створити рецепт</button> : null}
      </div> 
      : <ul className="mainPage__recipes-list">
              {/* {spiner} */}
              <RecipesItem data={visibleData()}/>
            </ul>
  }


  const spiner = recipes ? renderRecipes() : <Spinner/>

  return spiner
}

export default RecipesList;