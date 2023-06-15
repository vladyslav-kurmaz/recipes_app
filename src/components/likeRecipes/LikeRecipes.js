import { useDispatch, useSelector } from 'react-redux';

import RecipesItem from '../recipesItem/RecipesItem';

import './LikeRecipes.scss';

const LikeRecipes = ({title, data}) => {


  const renderItem = (data) => {
    console.log(data);
    // return data?.map(item => {
      return <RecipesItem data={data}/>
    // })
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