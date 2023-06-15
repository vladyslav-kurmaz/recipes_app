import { useState } from 'react';
import {FormControl, TextField, MenuItem, InputLabel, Select, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import {closeAddNewRecipesPopup} from '../../store/RecipesStore'

import './CreateNewRecipes.scss';

import plusIcon from '../../image/plus.webp'

const CreateNewRecipes = () => {

  const [ingredients, setIngredients] = useState([1, 2, 3]);
  const [steps, setSteps] = useState([1, 2, 3]);
  const dispatch = useDispatch();
  const {showAddNewPopup} = useSelector(state => state.recipes)

  const addIngredient = () => {
    setIngredients((prevIngredients) => [...prevIngredients, '']);
  };

  const addStep = () => {
    setSteps((prevSteps) => [...prevSteps, '']);
  };

  const stepAndIngredients = (state, setState, step) => {
    return (
      <>
        <div 
          className="createNew__container-form-ing-container">
            {state.map((elem, index) => (
              <TextField
                key={index}
                id={`outlined-basic-${index}`}
                style={{ width: '100%', marginBottom: '20px' }}
                label={`${index + 1}`}
                multiline={step ? true : false} 
                variant="outlined"
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

  return (
    <div className='createNew'
      style={showAddNewPopup ? {'display': 'block'} : {'display': 'none'}}
      onClick={closePopup}>
      <div className='createNew__container'>
        <h2 className='createNew__container-title'>Створіть новий рецепт</h2>
        
        <form className='createNew__container-form'>
          <span className='createNew__container-form-close'
            onClick={closePopup}>✖</span>
          <TextField 
            id="outlined-basic" 
            style={{'width': '100%', 'marginBottom': '20px'}}
            label="Назва рецепту" 
            variant="outlined"  />


          <FormControl 
            fullWidth 
            style={{'width': '100%', 'marginBottom': '20px'}}>
            <InputLabel id="demo-simple-select-label">Тип</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              label="Age"
              // onChange={handleChange}
            >
              <MenuItem value={"first"}>Перші страви</MenuItem>
              <MenuItem value={"second"}>Другі страви</MenuItem>
              <MenuItem value={"salad"}>Салати</MenuItem>
              <MenuItem value={"desserts"}>Десерти</MenuItem>
            </Select>
          </FormControl>

          <TextField 
            id="outlined-basic" 
            style={{'width': '100%', 'marginBottom': '20px'}}
            label="Опис рецепту" 
            multiline
            variant="outlined"  />

          <h3 className='createNew__container-form-ing'>Інгредієнти</h3>

          {stepAndIngredients(ingredients, addIngredient, false)}

          <h3 className='createNew__container-form-step'>Інструкції</h3>

          {stepAndIngredients(steps, addStep, true)}

          <Button 
            variant="contained"
            style={{'marginBottom': '20px'}}
            disabled={false}>Contained</Button>


        </form>
      </div>
    </div>
  )
}

export default CreateNewRecipes;