
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import './RecipesItem.scss';

import noLikeIcon from '../../image/like.webp';
import likeIcon from '../../image/love.webp';
import star from '../../image/star.webp';
import noImage from '../../image/noImage.webp'

const RecipesItem = ({data}) => {
  const {activeId} = useSelector(state => state.user)
  return data?.map(item => {
    const {_id, title, description, ingredients, rating, image, like} = item;
    const ingr = ingredients.map((item, i) => {
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
            {activeId ? <img className="mainPage__recipes-item-container-revue-like" src={like ? likeIcon : noLikeIcon} alt="Like recipes" /> : null}
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