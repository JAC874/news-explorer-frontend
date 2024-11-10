import "./Header.css";
import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";

function Header({ handleLoginClick }) {
  return (
    <header className="header">
      <div className="header__nav-container">
        <Navigation handleLoginClick={handleLoginClick} />
      </div>
      <div className="header__text-container">
        <h1 className="header__title">What's going on in the world?</h1>
        <h2 className="header__sub-title">
          Find the latest news on any topic and save them in your personal
          account.
        </h2>
        <SearchForm />
      </div>
    </header>
  );
}

export default Header;
