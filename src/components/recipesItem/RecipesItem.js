
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { changeLike } from "../../store/RecipesStore";
import RecipesService from "../../service/RecipesService";
import { addLikeRecipes } from "../../store/UsersStore";

import './RecipesItem.scss';

import noLikeIcon from '../../image/like.webp';
import likeIcon from '../../image/love.webp';
import star from '../../image/star.webp';
import noImage from '../../image/noImage.webp'

const RecipesItem = ({data}) => {
  const {patchtUsersInfo, patchtRecipesInfo} = RecipesService();
  const dispatch = useDispatch();
  const {activeId, user} = useSelector(state => state.user)
  const {recipes} = useSelector(state => state.recipes)

  const likeChange = (recipe) => {
    dispatch(changeLike(recipe._id))

    const cloneRecipe = JSON.parse(JSON.stringify(recipe))
    cloneRecipe.like = !cloneRecipe.like;

    dispatch(addLikeRecipes(cloneRecipe))

    const recipeId = recipes.filter(item => item._id === recipe._id)

    const jsonRecipes = JSON.stringify(cloneRecipe)

    patchtRecipesInfo(jsonRecipes, recipeId[0].id)

      .catch(error => console.error(error))

    const cloneUser = JSON.parse(JSON.stringify(user));

    if (cloneRecipe.like) {
      
      cloneUser[0].likeRecipes.unshift(cloneRecipe);
      const jsonUser = JSON.stringify(cloneUser[0])

      patchtUsersInfo(jsonUser, cloneUser[0].id)
        .catch(error => console.error(error))
    } else {

      const filtered = cloneUser[0].likeRecipes.filter(item => item._id !== recipe._id );
      cloneUser[0].likeRecipes = filtered
   
      const jsonUser = JSON.stringify(cloneUser[0])

      patchtUsersInfo(jsonUser, cloneUser[0].id)

        .catch(error => console.error(error))
    }

    
  }

  return data?.map(item => {
    const {_id, title, description, ingredients, rating, image} = item;
    const activeLikeRecipes = user?.length === 1 ? user[0]?.likeRecipes?.filter(item => item._id === _id) : null
    const ingr = ingredients?.map((item, i) => {
      return (
        <li className="mainPage__recipes-item-container-ingredients-list-item" key={i}>        
          <span className="recipes-item-container-ingredients-list-item-text">{item}</span>
        </li>
      )
    })



    return (
      <li className="mainPage__recipes-item" key={_id}>
        <div className="mainPage__recipes-item-container">
          <div className="mainPage__recipes-item-container-revue">
            <span className="mainPage__recipes-item-container-revue-rating">{rating}
              <img className="mainPage__recipes-item-container-revue-rating-star" src={star} alt="rating" />
            </span>
            {activeId ? <img className="mainPage__recipes-item-container-revue-like" onClick={() => likeChange(item)} src={activeLikeRecipes[0]?.like ? likeIcon : noLikeIcon} alt="Like recipes" /> : null}
          </div>
            <h2 className="mainPage__recipes-item-container-link-title">{title}</h2>
            <img src={image ? image : noImage} alt={title} className="mainPage__recipes-item-container-link-page"/>
            <p className="mainPage__recipes-item-container-link-description">{description}</p>
        
          <div className="mainPage__recipes-item-container-ingredients">
            <h3 className="mainPage__recipes-item-container-ingredients-title">Інгрідієнти</h3>
            <ul className="mainPage__recipes-item-container-ingredients-list">
              {ingr}
            </ul>
          </div>

          <Link to={activeId ? `/${activeId}/${_id}` : `/recipe/${_id}`} key={_id} className="mainPage__recipes-item-container-button">Детальніше</Link>
        </div>
      </li>
    )
  })
}

export default RecipesItem;