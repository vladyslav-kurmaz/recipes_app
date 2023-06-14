import RecipesItem from '../recipesItem/RecipesItem';

import './LikeRecipes.scss';

const LikeRecipes = ({title}) => {
  return (
    <section className='likeRecipes'>
      <h2 className='likeRecipes__title'>{title}</h2>
      <ul className='likeRecipes__list'>
        <RecipesItem/>
        <RecipesItem/>
        <RecipesItem/>
        <RecipesItem/>
      </ul>
    </section>
  )
}

export default LikeRecipes;