import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import noLikeIcon from '../../image/like.webp';
import likeIcon from '../../image/love.webp';
import star from '../../image/star.webp';
import noImage from '../../image/noImage.webp';


import './RecipesInfo.scss';

const RecipesInfo = () => {
  const {recipes} = useSelector(state => state.recipes);
  const {activeId} = useSelector(state => state.user);
  const {recipesId} = useParams();

  const selectRecip = () => {
    return recipes.map(item => {

      if (item._id === recipesId) {
        const {title, rating, image, like, description, ingredients, instructions} = item
        
        const ingr = ingredients.map((item, i) => (
          <li className="resipesInfo__container-ingr-list-item" key={i + 20}>
            {/* <div className="mainPage__recipes-item-container-ingredients-list-item-input">
              <input type="checkbox" id="checkbox-ingredients" className="recipes-item-container-ingredients-list-item-input-checkbox"/>
              <label htmlFor="checkbox-ingredients" className="recipes-item-container-ingredients-list-item-input-checkbox-label"></label>
            </div> */}
            <span className="resipesInfo__container-ingr-list-item-text">{item}</span>
            
          </li>
        ));

        const inst = instructions.map((item, i) => (
          item === '' ? null : <li className='resipesInfo__list-step-item' key={i + 200}>
            <span className='resipesInfo__list-step-item-number'>{i + 1}</span>
            <p className="resipesInfo__list-step-item-description">
              {item}
            </p>
          </li>
        ));

        return (
          <main className='resipesInfo' key={1}>
            <h1 className='resipesInfo__title' key={2}>{title}</h1>
    
            <div className="resipesInfo__revue" key={3}>
              <span className="resipesInfo__revue-rating" key={4}>{rating} 
                <img className="resipesInfo__revue-rating-star" key={5} src={star} alt="rating" />
              </span>
              {activeId ? <img className="resipesInfo__revue-like" key={6} src={like ? likeIcon : noLikeIcon} alt="Like recipes" /> : null}
            </div>
            <div className="resipesInfo__container" key={7}>
              <img className='resipesInfo__container-image' key={8} src={image ? image : noImage} alt={title} />
              <div className="resipesInfo__container-ingr" key={9}>
                <h3 className="resipesInfo__container-ingr-ingredients" key={10}>Інгрідієнти</h3>
                <ul className="resipesInfo__container-ingr-list" key={11}>
                  {ingr}        
                </ul>
              </div>  
            </div>
            
            <p className="resipesInfo__description" key={12}>{description ? description : <span style={{'color': '#ff4444', 'fontSize': '20px'}}>Цей рецепт без опису</span>}</p>
            
            <h3 className="resipesInfo__step" key={13}>Інструкції</h3>
            <ul className="resipesInfo__list-step" key={14}>
              {inst}
            </ul>
          </main>
        )
      } else {
        return null 
      }
       
    })
  }

  return selectRecip()
    
}

export default RecipesInfo;