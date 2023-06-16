import { useSelector } from "react-redux";

import LikeRecipes from "../components/likeRecipes/LikeRecipes";


const MyRecipesPage = () => {
  const {user} = useSelector(state => state.user);
  const {likeRecipes, createRecipes} = user[0]

  return (
    <main>
      <LikeRecipes title={'Рецепти що сподобались:'} data={likeRecipes} message={'Вподобаних рецептів ще нема'}/>
      <LikeRecipes title={'Створені рецепти'} data={createRecipes} message={'Ви ще не сторювали рецепти'}/>
    </main>
  )
}

export default MyRecipesPage;