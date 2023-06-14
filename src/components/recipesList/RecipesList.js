import RecipesItem from "../recipesItem/RecipesItem";

import './RecipesList.scss';

const RecipesList = () => {
  return (
    <ul className="mainPage__recipes-list">
      <RecipesItem key={1}/>
    </ul>
  )
}

export default RecipesList;