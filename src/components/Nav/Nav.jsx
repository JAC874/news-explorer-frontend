import "./Nav.css";
import NavLoggedIn from "../NavLoggedIn/NavLoggedIn";
import NavLoggedOut from "../NavLoggedOut/NavLoggedOut";
import MobileMenu from "../MobileMenu/MobileMenu";
import { useState } from "react";

function Nav({
  handleLoginClick,
  isInverse,
  isLoggedIn,
  handleLogout,
  username,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <nav className="nav" data-theme={isInverse ? "light" : "dark"}>
      <p className="nav__logo">NewsExplorer</p>
      <button
        onClick={toggleMobileMenu}
        className={
          isInverse ? "nav__menu-btn nav__menu-btn-black" : "nav__menu-btn"
        }
      ></button>

      {isLoggedIn ? (
        <NavLoggedIn
          isInverse={isInverse}
          handleLogout={handleLogout}
          username={username}
        />
      ) : (
        <NavLoggedOut handleLoginClick={handleLoginClick} />
      )}

      {isMenuOpen && (
        <MobileMenu
          isLoggedIn={isLoggedIn}
          onClose={toggleMobileMenu}
          handleLoginClick={handleLoginClick}
          handleLogout={handleLogout}
          username={username}
        />
      )}
    </nav>
  );
}

export default Nav;
