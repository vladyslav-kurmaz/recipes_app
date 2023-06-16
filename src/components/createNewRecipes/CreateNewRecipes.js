import { useState, useEffect } from 'react';
import {FormControl, TextField, MenuItem, InputLabel, Select, Button } from '@mui/material';
import { v4 as uuidv4 } from "uuid";

import { useSelector, useDispatch } from 'react-redux';
import {closeAddNewRecipesPopup, addRecipeInAllRecipes, changeRecipesSuccess} from '../../store/RecipesStore';
import { addRecipeInUser, changeUserStatus, changeUserSuccess } from '../../store/UsersStore';
import RecipesService from '../../service/RecipesService';

import './CreateNewRecipes.scss';

import plusIcon from '../../image/plus.webp'

const CreateNewRecipes = () => {
  const {postRecipesInfo, patchtUsersInfo, getAllRecipes, getUsersInfo} = RecipesService();
  const dispatch = useDispatch();
  const {showAddNewPopup, recipes} = useSelector(state => state.recipes)
  const {user, activeId} = useSelector(state => state.user);
  const [newResipe, setNewResipe] = useState({
    _id: '',
    title: '',
    type: '',
    like: false,
    rating: Math.floor(Math.random() * 6),
    image: '',
    description: '',
    ingredients: ['', '', ''],
    instructions: ['', '', '']
  })

  const addIngredient = () => {
    setNewResipe((state) => {
      return {
        ...state,
        ingredients: [...state.ingredients, '']
      }
    })
  };

  const addStep = () => {
    setNewResipe((state) => {
      return {
        ...state,
        instructions: [...state.instructions, '']
      }
    })
  };

  const addIngrOrStepToState = (e, step, setNewResipe, index) => {
    const value = e.target.value;

    if (step) {
      
      setNewResipe((state) => {
        return {
          ...state,
          instructions: state.instructions.map((item, i) => i === index ? item = value : item) 
        }
      })
    } else {
      
      setNewResipe((state) => {
        return {
          ...state,
          ingredients: state.ingredients.map((item, i) => i === index ? item = value : item) 
        }
      })
    }
  }

  const stepAndIngredients = (state, setState, step) => {
    return (
      <>
        <div 
          className="createNew__container-form-ing-container">
            {state.map((elem, index) => (
              <TextField
                key={index}
                onChange={(e) => addIngrOrStepToState(e, step, setNewResipe, index)}
                id={`outlined-basic-${index}${step}`}
                style={{ width: '100%', marginBottom: '20px' }}
                label={`${index + 1}`}
                multiline={step ? true : false} 
                variant="outlined"
                value={step ? newResipe.instructions[index] : newResipe.ingredients[index]}
              />
              ))}
          </div>

          <img 
            className='createNew__container-form-plus' 
            src={plusIcon} 
            alt="add ingridiens"
            onClick={setState} />
      </>
    )
  }

  const closePopup = () => {
    document.body.style.cssText = `
      overflow-y: auto;
    `
    dispatch(closeAddNewRecipesPopup())
  }

  const addAllIfoRecipe = (e) => {
    switch(e.target.name) {
      case 'title':
        return setNewResipe(state => {
          return {
            ...state,
            _id: uuidv4(),
            title: e.target.value
          }
        });
      case 'select-type':
        return setNewResipe(state => {
          return {
            ...state,
            type: e.target.value
          }
        });
      case 'description':
        return setNewResipe(state => {
          return {
            ...state,
            description: e.target.value
          }
        });
      default:
        return {};
    }
  }

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setNewResipe((prevRecipe) => ({ ...prevRecipe, image: imageUrl.slice(5)}));      
    }
  };

  const createNewRecipes = (e) => {
    e.preventDefault();
    dispatch(addRecipeInAllRecipes(newResipe))
    dispatch(addRecipeInUser(newResipe))

    const newRecipeJson = JSON.stringify(newResipe)

    postRecipesInfo(newRecipeJson)
      .then(res => console.log(res))
      .catch(e => console.error(e));
    console.log(newResipe);
    const cloneUser = JSON.parse(JSON.stringify(user[0]))
    cloneUser.createRecipes.unshift(newResipe)
    console.log(cloneUser);
    const userJson = JSON.stringify(cloneUser)

    patchtUsersInfo(userJson, cloneUser.id)

    closePopup();

    getUsersInfo()
      .then(res => res.filter(item => {
          return item._id === activeId
          }))
      .then((res) => {
          dispatch(changeUserSuccess(res))
          return res
      } )
      .then((res) => {
          dispatch(changeUserStatus('idle'));
      })
      .catch(e => console.error(e))

    getAllRecipes()
      .then(res => dispatch(changeRecipesSuccess(res)))
  }

  return (
    <div className='createNew'
      style={showAddNewPopup ? {'display': 'block'} : {'display': 'none'}}
      >
      <div className='createNew__container'>
        <h2 className='createNew__container-title'>Створіть новий рецепт</h2>
        
        <form 
          className='createNew__container-form'
          onSubmit={createNewRecipes}>
          <span 
            className='createNew__container-form-close'
            onClick={closePopup}>✖</span>

          <TextField 
            id="outlined-title"
            name="title"
            style={{'width': '100%', 'marginBottom': '20px'}}
            label="Назва рецепту" 
            variant="outlined" 
            onChange={(e) => addAllIfoRecipe(e)}
            value={newResipe.title} />

          <FormControl 
            fullWidth 
            style={{'width': '100%', 'marginBottom': '20px'}}>
            <InputLabel id="demo-simple-select-label">Тип</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="select-type"
              name="select-type"
              value={newResipe.type}
              label="Age"
              onChange={(e) => addAllIfoRecipe(e)}
              >
              <MenuItem value={"first"}>Перші страви</MenuItem>
              <MenuItem value={"second"}>Другі страви</MenuItem>
              <MenuItem value={"salad"}>Салати</MenuItem>
              <MenuItem value={"desserts"}>Десерти</MenuItem>
            </Select>
          </FormControl>

          <TextField 
            id="outlined-description" 
            name="description"
            style={{'width': '100%', 'marginBottom': '20px'}}
            label="Опис рецепту" 
            multiline
            variant="outlined"
            onChange={(e) => addAllIfoRecipe(e)}
            value={newResipe.description}  />

          <h3 className='createNew__container-form-ing'>Інгредієнти</h3>

          {stepAndIngredients(newResipe.ingredients, addIngredient, false)}

          <h3 className='createNew__container-form-step'>Інструкції</h3>

          {stepAndIngredients(newResipe.instructions, addStep, true)}

          <Button
            variant="contained"
            component="label"
            id='add-file'
            name='add-file'
            // startIcon={<ImageIcon />}
            style={{'marginBottom': '20px'}}
            
          >
            Завантажити зображення
            <input type="file" style={{ display: 'none' }} onChange={(e) => handleImageUpload(e)} />
            
          </Button>
          {newResipe.image && <img src={`blob:${newResipe.image}`} style={{'marginBottom': '20px', 'width': '300px', 'height': '200px', 'borderRadius': '20px'}}  alt="Selected" />}


          <Button 
            variant="contained"
            style={{'marginBottom': '20px'}}
            type='submit'
            disabled={false}>Створити</Button>

        </form>
      </div>
    </div>
  )
}

export default CreateNewRecipes;