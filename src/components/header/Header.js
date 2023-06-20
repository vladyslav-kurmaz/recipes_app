import { Link, useMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {showAddNewRecipesPopup} from '../../store/RecipesStore'
import { updateActiveUser, changeUserSuccess } from '../../store/UsersStore';


import './Header.scss'

const Header = () => {
  const dispatch = useDispatch()
  const {activeId} = useSelector(state => state.user);
  const {showAddNewPopup} = useSelector(state => state.recipes);
  const NavItem = ({to, label}) => {
    const match = useMatch(to);

    return (
      <Link to={to} style={match ? {'color': '#fd0000'} : {}}>{label}</Link>
    )
  }

  const openPopup = () => {
    document.body.style.cssText = `
      overflow-y: hidden;
    `
    dispatch(showAddNewRecipesPopup())
  }

  const logout = () => {
    dispatch(updateActiveUser(''));
    dispatch(changeUserSuccess(null));

  }

  const verifyActiveId = () => {
    return activeId ? (
      <>
        <li className='header__nav-item'>
          <NavItem to={activeId ? `/${activeId}/myrecipes` : '/myrecipes'} label={'Мої рецепти'}/>
        </li>
        <li className='header__nav-item'>
          <button 
            className='header__nav-item-create'
            onClick={openPopup}>Створити рецепт</button>
        </li>
        <li className='header__nav-item'>
          <Link to='/' onClick={logout}>Вихід</Link>
        </li>
      </>
      )  :
      (
        <>
          <li className='header__nav-item'>
            <NavItem to={'/login'} label={'Вхід'}/> 
          </li>
          <li className='header__nav-item'>
            <NavItem to={'/singup'} label={'Заре\'єструватись'}/>
          </li>
        </>
      )
    
  }

  return (
    <header className='header'>
      <nav className='header__nav'>
        <ul className='header__nav-list'>
          <li className='header__nav-item'>
             <NavItem to={activeId ? `/${activeId}` : '/'} label={'Головна'}/>
          </li>
          
          
          {verifyActiveId()}
          
        </ul>
      </nav>
    </header>
  )
}

export default Header;