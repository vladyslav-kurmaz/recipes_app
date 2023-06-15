
import request from "../http.hook/http.hook";

const RecipesService = () => {
  const _baceUrl = 'https://6489912e5fa58521caafd71e.mockapi.io/'

  const getAllRecipes = () => {
    const res = request(`${_baceUrl}allRecipes`);
    return res
  }

  const getUsersInfo = () => {
    const res = request(`${_baceUrl}users`);
    return res;
  }

  const postUsersInfo = (body) => {
    const res = request(`${_baceUrl}users`, 'POST', body);
    return res;
  }

  return {
    getAllRecipes,
    getUsersInfo,
    postUsersInfo
  }
}

export default RecipesService;