

import MainPageTitle from "../components/mainPageTitle/mainPageTitle";
import Filters from "../components/filters/Filters";
import RecipesList from "../components/recipesList/RecipesList";



const MainPage = () => {
  return (
    <div className="mainPage">
      <MainPageTitle/>
      <Filters/>

      <main className="mainPage__recipes">
        <RecipesList/>
      </main>
    </div>
  )
}

export default MainPage;