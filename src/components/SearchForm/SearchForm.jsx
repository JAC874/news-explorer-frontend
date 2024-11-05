import "./SearchForm.css";

function SearchForm() {
  return (
    <div className="search">
      <form className="search__form">
        <div className="search__input-container">
          <input
            type="text"
            className="search__input"
            placeholder="Enter topic"
          />
          <button type="submit" className="search__submit-btn">
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
