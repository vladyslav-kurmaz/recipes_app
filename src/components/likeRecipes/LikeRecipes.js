import { useDispatch, useSelector } from 'react-redux';

import RecipesItem from '../recipesItem/RecipesItem';

import './LikeRecipes.scss';

const LikeRecipes = ({title, message, data}) => {


  const renderItem = (data) => {
      return data.length === 0 ? <h2 className='likeRecipes__title'>{message}</h2> : <RecipesItem data={data}/>
  }


  return (
    <section className='likeRecipes'>
      <h2 className='likeRecipes__title'>{title}</h2>
      <ul className='likeRecipes__list'>
        {renderItem(data)}
      </ul>
    </section>
  )
}

export default LikeRecipes;