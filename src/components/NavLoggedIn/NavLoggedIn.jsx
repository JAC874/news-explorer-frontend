import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/currentUserContext";

function NavLoggedIn({ isInverse, handleLogout }) {
  const { currentUser } = useContext(CurrentUserContext);
  const location = useLocation();

  const signoutBtnClass = !isInverse
    ? "nav__signout-btn nav__signout-btn-white"
    : "nav__signout-btn";

  return (
    <ul className="nav__list">
      <li className="nav__list-item">
        <Link
          to="/"
          className={
            location.pathname === "/"
              ? "nav__link nav__link_focused"
              : "nav__link"
          }
        >
          Home
        </Link>
      </li>
      <li className="nav__list-item">
        <Link
          to="/saved-news"
          className={
            location.pathname === "/saved-news"
              ? "nav__link nav__link_focused"
              : "nav__link"
          }
        >
          Saved Articles
        </Link>
      </li>

      <li className="nav__list-item">
        <div className="nav__signout-container">
          <p className="nav__signout-name">
            {currentUser?.username || "Guest"}
          </p>
          <button
            onClick={handleLogout}
            type="button"
            className={signoutBtnClass}
          ></button>
        </div>
      </li>
    </ul>
  );
}

export default NavLoggedIn;
