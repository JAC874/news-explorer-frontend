import "./SearchForm.css";
import { useState } from "react";

function SearchForm({ handleSearchSubmit, setCurrentKeyword }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearchSubmit(value);
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    setCurrentKeyword(newValue);
  };

  return (
    <div className="search">
      <form onSubmit={handleSubmit} className="search__form">
        <div className="search__input-container">
          <input
            onChange={handleChange}
            type="text"
            className="search__input"
            placeholder="Enter topic"
            maxLength="20"
            required
            value={value || ""}
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
