
import LikeRecipes from "../components/likeRecipes/LikeRecipes";


const MyRecipesPage = () => {
  return (
    <main>
      <LikeRecipes title={'Рецепти що сподобались:'}/>
      <LikeRecipes title={'Створені рецепти'}/>

    </main>
  )
}

export default MyRecipesPage;