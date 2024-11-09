import { Link } from "react-router-dom";

import "./Navigation.css";

function Navigation() {
  return (
    <nav className="nav">
      <p className="nav_logo">NewsExplorer</p>
      <div className="nav__buttons">
        <Link to="/" className="nav__home-btn">
          Home
        </Link>
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

// later refactor into split components:
// Nav-Logged-in and Nav-Logged-Out

// add highlight bar (focus), how do I do that??

// change links to list items
