import "./MobileMenu.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/currentUserContext";

function MobileMenu({
  isLoggedIn,
  onClose,
  handleLoginClick,
  handleLogout,
  username,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="mobile-menu">
      <div className="mobile-menu__top">
        <p className="mobile-menu__logo">NewsExplorer</p>
        <button
          className="mobile-menu__close"
          type="button"
          onClick={onClose}
        ></button>
      </div>

      <div className="mobile-menu__links">
        {isLoggedIn ? (
          <>
            <ul className="mobile-menu__list">
              <li className="mobile-menu__item">
                <Link
                  to="/"
                  className="mobile-menu__link mobile-menu__link_loggedin"
                  onClick={onClose}
                >
                  Home
                </Link>
              </li>
              <li className="mobile-menu-item">
                <Link
                  to="/saved-news"
                  className="mobile-menu__link mobile-menu__link_loggedin"
                  onClick={onClose}
                >
                  Saved Articles
                </Link>
              </li>
            </ul>
            <div className="mobile-menu__signout-div">
              <div className="mobile-menu__signout-container">
                <p className="mobile-menu__signout-name">{username}</p>
                <button
                  onClick={handleLogout}
                  className="mobile-menu__signout-btn"
                ></button>
              </div>
            </div>
          </>
        ) : (
          <>
            <ul className="mobile-menu__list">
              <li className="mobile-menu-item">
                <Link to="/" className="mobile-menu__link" onClick={onClose}>
                  Home
                </Link>
              </li>
            </ul>
            <button
              onClick={handleLoginClick}
              className="mobile-menu__signin-btn"
            >
              Sign in
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default MobileMenu;
