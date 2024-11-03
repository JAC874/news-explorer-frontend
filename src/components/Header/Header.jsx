import "./Header.css";
import Navigation from "../Navigation/Navigation";

function Header() {
  return (
    <header className="header">
      <div className="header__nav-container">
        <Navigation />
      </div>
      <div className="header__text-container"></div>
      <div className="header__search-form-placeholder"></div>
    </header>
  );
}

export default Header;
