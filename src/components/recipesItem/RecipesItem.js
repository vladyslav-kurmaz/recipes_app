import { useEffect } from "react";
import RecipesService from "../../service/RecipesService";
import { Link } from "react-router-dom";

import './RecipesItem.scss';

import noLike from '../../image/like.webp';
import like from '../../image/love.webp';
import star from '../../image/star.webp';

const RecipesItem = () => {

  useEffect(() => {
    getAllRecipes()
      .then(users => console.log(users))
  }, [])

  const {getAllRecipes} = RecipesService();

  return (
    <li className="mainPage__recipes-item">
      <div className="mainPage__recipes-item-container">
        <div className="mainPage__recipes-item-container-revue">
          <span className="mainPage__recipes-item-container-revue-rating">5 
            <img className="mainPage__recipes-item-container-revue-rating-star" src={star} alt="rating" />
          </span>
          <img className="mainPage__recipes-item-container-revue-like" src={noLike} alt="Like recipes" />
        </div>
        <Link to='/id' className="mainPage__recipes-item-container-link">
          <h2 className="mainPage__recipes-item-container-link-title">Свинячі медальйони з гірчицею</h2>
          <img src="https://www.themealdb.com/images/media/meals/va668f1683209318.jpg" alt="" className="mainPage__recipes-item-container-link-page"/>
          <p className="mainPage__recipes-item-container-link-description">Свинячі медальйони, справжня святкова страва, яку нескладно приготувати у каструлі або на сковороді. Для цієї страви не потрібні особливі хитрощі та складні кулінарні техніки. Головне завдання – не пересушити м’ясо, зберегти м’якість волокон і підібрати відповідний супровід. У цьому рецепті приготуємо медальйони з гірчицею.</p>
        </Link>
       
        <div className="mainPage__recipes-item-container-ingredients">
          <h3 className="mainPage__recipes-item-container-ingredients-title">Інгрідієнти</h3>
          <ul className="mainPage__recipes-item-container-ingredients-list">
            <li className="mainPage__recipes-item-container-ingredients-list-item">
              {/* <div className="mainPage__recipes-item-container-ingredients-list-item-input">
                <input type="checkbox" id="checkbox-ingredients" className="recipes-item-container-ingredients-list-item-input-checkbox"/>
                <label htmlFor="checkbox-ingredients" className="recipes-item-container-ingredients-list-item-input-checkbox-label"></label>
              </div> */}
              
              <span className="recipes-item-container-ingredients-list-item-text">Сdfgfdgdgіль</span>
            </li>
          </ul>
        </div>
      </div>
    </li>
  )
}

export default RecipesItem;