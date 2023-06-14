import { Link } from 'react-router-dom';


import './Header.scss'

const Header = () => {

  return (
    <header className='header'>
      <nav className='header__nav'>
        <ul className='header__nav-list'>
          <li className='header__nav-item'>
            <Link to='/'>Головна</Link> 
          </li>
          <li className='header__nav-item'>
            <Link to='/myrecipes'>Мої рецепти</Link>
          </li>
          <li className='header__nav-item'>
            <button className='header__nav-item-create'>Створити рецепт</button>
          </li>
          <li className='header__nav-item'>
            <Link to='/'>Вихід</Link>  
          </li>
          <li className='header__nav-item'>
            <Link to='/login'>Вхід</Link>  
          </li>
          <li className='header__nav-item'>
            <Link to='/singup'>Заре'єструватись</Link> 
          </li>
          
        </ul>
      </nav>
    </header>
  )
}

export default Header;