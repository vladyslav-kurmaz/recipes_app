import './RecipesInfo.scss';

import noLike from '../../image/like.webp';
import like from '../../image/love.webp';
import star from '../../image/star.webp';

const RecipesInfo = () => {
  return (
    <main className='resipesInfo'>
      <h1 className='resipesInfo__title'>Свинячі медальйони з гірчицею</h1>

      <div className="resipesInfo__revue">
          <span className="resipesInfo__revue-rating">5 
            <img className="resipesInfo__revue-rating-star" src={star} alt="rating" />
          </span>
          <img className="resipesInfo__revue-like" src={noLike} alt="Like recipes" />
        </div>
      <div className="resipesInfo__container">
        <img className='resipesInfo__container-image' src="https://www.themealdb.com/images/media/meals/va668f1683209318.jpg" alt="" />
        <div className="resipesInfo__container-ingr">
          <h3 className="resipesInfo__container-ingr-ingredients">Інгрідієнти</h3>
          <ul className="resipesInfo__container-ingr-list">
            <li className="resipesInfo__container-ingr-list-item">
              {/* <div className="mainPage__recipes-item-container-ingredients-list-item-input">
                <input type="checkbox" id="checkbox-ingredients" className="recipes-item-container-ingredients-list-item-input-checkbox"/>
                <label htmlFor="checkbox-ingredients" className="recipes-item-container-ingredients-list-item-input-checkbox-label"></label>
              </div> */}
              <span className="resipesInfo__container-ingr-list-item-text">Сdfgfdgdgіль</span>
              
            </li>
            <li className="resipesInfo__container-ingr-list-item">
              <div className="mainPage__recipes-item-container-ingredients-list-item-input">
                <input type="checkbox" id="checkbox-ingredients" className="recipes-item-container-ingredients-list-item-input-checkbox"/>
                <label htmlFor="checkbox-ingredients" className="recipes-item-container-ingredients-list-item-input-checkbox-label"></label>
              </div>
              <span className="resipesInfo__container-ingr-list-item-text">Сdfgfdgdgіль</span>
              
            </li>
                        
          </ul>
        </div>
        
      </div>
      
      
      <p className="resipesInfo__description">Свинячі медальйони, справжня святкова страва, яку нескладно приготувати у каструлі або на сковороді. Для цієї страви не потрібні особливі хитрощі та складні кулінарні техніки. Головне завдання – не пересушити м’ясо, зберегти м’якість волокон і підібрати відповідний супровід. У цьому рецепті приготуємо медальйони з гірчицею.</p>
      
      

      <ul className="resipesInfo__list-step">
        <li className='resipesInfo__list-step-item'>
          <span className='resipesInfo__list-step-item-number'>1</span>
          <p className="resipesInfo__list-step-item-description">
            Свинячі медальйони, справжня святкова страва, яку нескладно приготувати у каструлі або на сковороді. Для цієї страви не потрібні особливі хитрощі та складні кулінарні техніки. Головне завдання – не пересушити м’ясо, зберегти м’якість волокон і підібрати відповідний супровід. У цьому рецепті приготуємо медальйони з гірчицею
          </p>
        </li>
      </ul>
    </main>
  );
}

export default RecipesInfo;