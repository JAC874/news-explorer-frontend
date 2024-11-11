import Header from "../Header/Header";
import About from "../About/About";
import NewsCardList from "../NewsCardList/NewsCardList";

function Main({
  isLoggedIn,
  handleLoginClick,
  handleLogout,
  newsData,
  isSuccess,
  isLoading,
  isError,
  handleSearchSubmit,
  setCurrentKeyword,
  currentKeyword,
}) {
  return (
    <main>
      <Header
        isLoggedIn={isLoggedIn}
        handleLoginClick={handleLoginClick}
        handleLogout={handleLogout}
        handleSearchSubmit={handleSearchSubmit}
        setCurrentKeyword={setCurrentKeyword}
        currentKeyword={currentKeyword}
      />
      <NewsCardList
        isLoggedIn={isLoggedIn}
        newsData={newsData}
        isSuccess={isSuccess}
        isLoading={isLoading}
        isError={isError}
        currentKeyword={currentKeyword}
      />
      <About />
    </main>
  );
}

export default Main;
