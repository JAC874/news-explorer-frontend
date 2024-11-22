import "./Header.css";
import Nav from "../Nav/Nav";
import SearchForm from "../SearchForm/SearchForm";

function Header({
  isLoggedIn,
  handleLoginClick,
  handleLogout,
  handleSearchSubmit,
  setCurrentKeyword,
  currentKeyword,
  username,
}) {
  const isInverse = false;

  return (
    <header className="header" data-theme={isInverse ? "light" : "dark"}>
      <div className="header__nav-container">
        <Nav
          isLoggedIn={isLoggedIn}
          handleLoginClick={handleLoginClick}
          handleLogout={handleLogout}
          isInverse={false}
          username={username}
        />
      </div>
      <div className="header__text-container">
        <h1 className="header__title">What's going on in the world?</h1>
        <h2 className="header__sub-title">
          Find the latest news on any topic and save them in your personal
          account.
        </h2>
        <SearchForm
          handleSearchSubmit={handleSearchSubmit}
          setCurrentKeyword={setCurrentKeyword}
          currentKeyword={currentKeyword}
        />
      </div>
    </header>
  );
}

export default Header;
