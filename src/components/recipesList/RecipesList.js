import { useEffect } from "react";
import RecipesItem from "../recipesItem/RecipesItem";
import RecipesService from "../../service/RecipesService";
import { useDispatch, useSelector } from "react-redux";
import {changeRecipesLoading, changeRecipesSuccess, changeRecipesError} from '../../store/RecipesStore'
import Spinner from "../spiner/spiner";

import './RecipesList.scss';

const RecipesList = () => {
  const {getAllRecipes} = RecipesService();
  const dispatch = useDispatch();
  const {recipes, curentFilter} = useSelector(store => store.recipes);


  useEffect(() => {
    dispatch(changeRecipesLoading())
    getAllRecipes()
      .then(recipes => dispatch(changeRecipesSuccess(recipes)))
      .catch(dispatch(changeRecipesError()))
  }, [])

  const renderRecipes = () => {

    const visibleData = () => {
      if (curentFilter === 'all') {
        return recipes;
      }
      return recipes.filter(item => item.type === curentFilter);
    }

    return <RecipesItem data={visibleData()}/>
  }

  const spiner = recipes ? renderRecipes() : <Spinner/>

  return (
    <ul className="mainPage__recipes-list">
      {spiner}
    </ul>
  )
}

export default RecipesList;