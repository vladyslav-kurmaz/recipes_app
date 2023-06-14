
import './Filters.scss';

const Filters = () => {
  return (
    <ul className="mainPage__filter-list">
      <li className="mainPage__filter-list-item active" data-type='first'>Перші страви</li>
      <li className="mainPage__filter-list-item" data-type='second'>Другі страви</li>
      <li className="mainPage__filter-list-item" data-type='salad'>Салати</li>
      <li className="mainPage__filter-list-item" data-type='desserts'>Десерти</li>
    </ul>
  )
}

export default Filters;