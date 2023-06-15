import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from '../../store/RecipesStore';

import './Filters.scss';

const Filters = () => {
  const dispatch = useDispatch();
  const {filters, curentFilter} = useSelector(state => state.recipes);

  const renderFilter = () => {
    return filters.map((item, i) => <li 
                        key={i}
                        className="mainPage__filter-list-item" 
                        data-type={item[0]}
                        style={filterStyle(item[0])}
                        onClick={curentFilters}>{item[1]}</li>)
  }

  const curentFilters = (e) => {
    dispatch(changeFilter(e.target.getAttribute('data-type')))
  }

  const filterStyle = (item) => {
    return item === curentFilter ? 
      {'backgroundColor': '#fd0000', 'color': '#fff', 'transition': 'all .4s'}: {}
  }

  

  return (
    <ul className="mainPage__filter-list">
      {renderFilter()}
    </ul>
  )
}

export default Filters;