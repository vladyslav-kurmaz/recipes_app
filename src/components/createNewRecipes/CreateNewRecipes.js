import { useState } from 'react';
import {FormControl, TextField, MenuItem, InputLabel, Select, Button } from '@mui/material';
import { v4 as uuidv4 } from "uuid";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { useSelector, useDispatch } from 'react-redux';
import {closeAddNewRecipesPopup, addRecipeInAllRecipes} from '../../store/RecipesStore';
import { addRecipeInUser, changeUserStatus, changeUserSuccess } from '../../store/UsersStore';
import RecipesService from '../../service/RecipesService';

import './CreateNewRecipes.scss';

import plusIcon from '../../image/plus.webp'

const CreateNewRecipes = () => {
  const {postRecipesInfo, patchtUsersInfo, getUsersInfo} = RecipesService();
  const dispatch = useDispatch();
  const {showAddNewPopup} = useSelector(state => state.recipes)
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

  const stepAndIngredients = (values, setState, step) => {
    return (
      <>
        <div 
          className="createNew__container-form-ing-container">
            {values?.map((elem, index) => (
              <label className='createNew__container-form-ing-container-label'>

                <Field
                  as={TextField}
                  key={step ? index + 100 : index + 200}
                  name={step ? `instructions[${index}]` : `ingredients[${index}]`}
                  id={step ? `instructions${index}` : `ingredients${index}`}
                  style={{ 'width': '100%', 'marginBottom': '40px', 'position': 'relative' }}
                  label={`${index + 1}`}
                  multiline={step ? true : false} 
                  variant="outlined"
                  onChange={(e) => {
                    values[index] = e.target.value
                    addIngrOrStepToState(e, false, setNewResipe, index)
                  }}
                />
                <ErrorMessage name={step ? `instructions[${index}]` : `ingredients[${index}]`} className='error-validation-ingr-step' component="div" />
                
              </label>
              ))}
        </div>

        <img 
          className='createNew__container-form-plus' 
          src={plusIcon} 
          key={false ? 1 : 2}
          alt="add ingridiens"
          onClick={() => {
            false ? addStep() : addIngredient()
          }} />
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
      case 'type':
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

  const createNewRecipes = (values, actions) => {
     
    dispatch(addRecipeInAllRecipes(newResipe))
    dispatch(addRecipeInUser(newResipe))

    const newRecipeJson = JSON.stringify(newResipe)

    postRecipesInfo(newRecipeJson)
      .then(res => console.log(res))
      .catch(e => console.error(e))
      .finally(() => {

        actions.setSubmitting(false);
        actions.resetForm({
          values: {
            title: '',
            type: '',
            image: '',
            description: '',
            ingredients: ['', '', ''],
            instructions: ['', '', '']
          }})

        setNewResipe({
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
      });


    const cloneUser = JSON.parse(JSON.stringify(user[0]))
    cloneUser.createRecipes.unshift(newResipe)

    const userJson = JSON.stringify(cloneUser)

    patchtUsersInfo(userJson, cloneUser.id)

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

    closePopup();
  }

  const validationSchema = Yup.object({
    title: Yup.string()
              .min(3, 'Назва рецепту має бути мінімум 3 символи')
              .required('Назва рецепту обов\'язкова'),

    type: Yup.string()
            .required('Виберіть тип страви'),

    description: Yup.string()
                    .min(10, 'Опис має бути мінімум 10 символи')
                    .required('Напишіть опис рецепту'),

    ingredients: Yup.array()
                  .of(
                    Yup.string()
                      .min(2, 'Мінімальна довжина інгредієнта 2 символів')
                      .required('Інгредієнт обов\'язковий')
                  ),

    instructions: Yup.array()
                    .of(
                      Yup.string()
                        .min(10, 'Мінімальна довжина інструкції 10 символів')
                        .required('Інструкція обов\'язкова')
                    )
  
  });

  return (
    <div className='createNew'
      style={showAddNewPopup ? {'display': 'block'} : {'display': 'none'}}
      >
      <div className='createNew__container'>
        <h2 className='createNew__container-title'>Створіть новий рецепт</h2>
        
        <Formik
          key={1}
          initialValues={{ title: newResipe.title, type: newResipe.type, description: newResipe.description, ingredients: newResipe.ingredients, instructions: newResipe.instructions, image: newResipe.image}}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            createNewRecipes(values, actions)
          }}>

          {({values, resetForm}) => (
            <Form
              key={2}
              className='createNew__container-form'
              >
              <span 
                className='createNew__container-form-close'
                onClick={closePopup}>✖</span>

              <Field
                key={4}
                as={TextField} 
                id="outlined-title"
                name="title"
                style={{'width': '100%', 'marginBottom': '20px'}}
                label="Назва рецепту" 
                variant="outlined" 
                onChange={(e) => {
                  values.title = e.target.value
                  addAllIfoRecipe(e)
                }}
              />

              <ErrorMessage key={5} name="title" className='error-validation' component="div" />

              <FormControl 
                key={6}
                fullWidth 
                style={{'width': '100%', 'marginBottom': '20px'}}>
                <InputLabel key={7} id="demo-simple-select-label">Тип</InputLabel>
                <Field
                  key={8}
                  as={Select}
                  id="select-type"
                  name="type"
                  label="Тип"

                  onChange={(e) => {
                    values.type = e.target.value
                    addAllIfoRecipe(e)
                  }}>

                  <MenuItem key={9} value={"first"}>Перші страви</MenuItem>
                  <MenuItem key={10} value={"second"}>Другі страви</MenuItem>
                  <MenuItem key={11} value={"salad"}>Салати</MenuItem>
                  <MenuItem key={12} value={"desserts"}>Десерти</MenuItem>
                  
                </Field>
              </FormControl>

              <ErrorMessage key={22} name="type" className='error-validation' component="div" />
              
        
              <Field 
                key={13}
                as={TextField} 
                id="outlined-description" 
                name="description"
                style={{'width': '100%', 'marginBottom': '20px'}}
                label="Опис рецепту" 
                multiline
                variant="outlined"
                onChange={(e) => {
                  values.description = e.target.value
                  addAllIfoRecipe(e)
                }}
              />

              <ErrorMessage key={14} name="description" className='error-validation' component="div" />

              <h3 className='createNew__container-form-ing'>Інгредієнти</h3>

              

              {showAddNewPopup ? stepAndIngredients(values?.ingredients, addIngredient, false) : null}

              <h3 className='createNew__container-form-step'>Інструкції</h3>

              {showAddNewPopup ? stepAndIngredients(values?.instructions, addStep, true) : null}

              <Button
                key={17}
                variant="contained"
                component="label"
                id='add-file'
                name='add-file'
                style={{'marginBottom': '20px'}}
                onClick={resetForm}>
                Завантажити зображення
                <input
                  type="file" style={{ display: 'none' }} 
                  onChange={(e) => {
                    handleImageUpload(e)

                  }} />
              </Button>
              {newResipe.image && <img src={`blob:${newResipe.image}`} style={{'marginBottom': '20px', 'width': '300px', 'height': '200px', 'borderRadius': '20px'}}  alt="Selected" />}


              <Button 
                key={21}
                variant="contained"
                style={{'marginBottom': '20px'}}
                type='submit'
                disabled={false}>Створити</Button>

            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default CreateNewRecipes;