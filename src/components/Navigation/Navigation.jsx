import "./Navigation.css";

function Navigation() {
  return (
    <nav className="nav">
      <p className="nav_logo">NewsExplorer</p>
      <div className="nav__buttons">
        <button type="button" className="nav__home-btn">
          Home
        </button>
        <button type="button" className="nav__saved-articles-btn">
          Saved articles
        </button>
        <button type="button" className="nav__sign-in-btn">
          Sign in
        </button>
        <button type="button" className="nav__user-btn">
          Elise
        </button>
      </div>
    </nav>
  );
}

export default Navigation;
