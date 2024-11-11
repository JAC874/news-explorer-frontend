import Header from "../Header/Header";
import About from "../About/About";
import NewsCardList from "../NewsCardList/NewsCardList";

function Main({ isLoggedIn, handleLoginClick, handleLogout }) {
  return (
    <main>
      <Header
        isLoggedIn={isLoggedIn}
        handleLoginClick={handleLoginClick}
        handleLogout={handleLogout}
      />
      <NewsCardList isLoggedIn={isLoggedIn} />
      <About />
    </main>
  );
}

export default Main;
