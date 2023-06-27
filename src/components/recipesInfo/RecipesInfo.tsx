import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Spinner from '../spiner/spiner';

import { IRecipe } from '../../types/interfaces';
import { RootState } from '../../types/interfaces';

import noLikeIcon from '../../image/like.webp';
import likeIcon from '../../image/love.webp';
import star from '../../image/star.webp';
import noImage from '../../image/noImage.webp';


import './RecipesInfo.scss';

const RecipesInfo: React.FC = () => {
  const recipes = useSelector<RootState>(state => state.recipes);
  const activeId = useSelector<RootState>(state => state.user);
  const {recipesId} = useParams();

  const selectRecip = (): JSX.Element | null => {
    if (Array.isArray(recipes)) {

        const selectedRecipe: IRecipe | null = recipes.find(item => item._id === recipesId);  
          
        if (selectedRecipe) {
          const {title, rating, image, like, description, ingredients, instructions} = selectedRecipe
          
          const ingr: JSX.Element[] = ingredients.map((item: string, i: number) => (
            <li className="resipesInfo__container-ingr-list-item" key={i + 20}>
              {/* <div className="mainPage__recipes-item-container-ingredients-list-item-input">
                <input type="checkbox" id="checkbox-ingredients" className="recipes-item-container-ingredients-list-item-input-checkbox"/>
                <label htmlFor="checkbox-ingredients" className="recipes-item-container-ingredients-list-item-input-checkbox-label"></label>
              </div> */}
              <span className="resipesInfo__container-ingr-list-item-text">{item}</span>
              
            </li>
          ));
  
          const inst: JSX.Element[] = instructions.map((item: string, i: number) => (
            <li className='resipesInfo__list-step-item' key={i + 200}>
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
         

    } else {
      return <Spinner/>
    }
    
      
  }
  return selectRecip()
    
}

export default RecipesInfo;