

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

  const getOneUserInfo = (id) => {
    const res = request(`${_baceUrl}users/${id}`);
    return res;
  }

  const postUsersInfo = (body) => {
    const res = request(`${_baceUrl}users`, 'POST', body);
    return res;
  }

  const patchtUsersInfo = (body, id) => {
    const res = request(`${_baceUrl}users/${id}`, 'PUT', body);
    return res;
  }

  const patchtRecipesInfo = (body, id) => {
    const res = request(`${_baceUrl}allRecipes/${id}`, 'PUT', body);
    return res;
  }

  const postRecipesInfo = (body) => {
    const res = request(`${_baceUrl}allRecipes`, 'POST', body);
    return res;
  }

  return {
    getAllRecipes,
    getUsersInfo,
    postUsersInfo,
    patchtUsersInfo,
    patchtRecipesInfo,
    postRecipesInfo,
    getOneUserInfo,
  }
}

export default RecipesService;