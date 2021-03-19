import './SearchForm.css';

const SearchForm = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className="search">
      <form className="search__form" onSubmit={handleSubmit}>
        <input className="search__input" placeholder="Фильм"></input>
        <button type="submit" className="search__button">Поиск</button>
      </form>
      <label className="search__tumbler">
        <input type="checkbox" className="search__checkbox"></input>
        <span className="search__slider"></span>
        <span className="search__label-text">Короткометражки</span>
      </label>
      
    </div>

  );
};

export default SearchForm;