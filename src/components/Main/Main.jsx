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
  totalResults,
  loadMoreArticles,
  setDisplayedArticlesCount,
  username,
  handleDeleteArticle,
  handleSaveArticle,
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
        username={username}
      />
      <NewsCardList
        isLoggedIn={isLoggedIn}
        newsData={newsData}
        isSuccess={isSuccess}
        isLoading={isLoading}
        isError={isError}
        currentKeyword={currentKeyword}
        totalResults={totalResults}
        loadMoreArticles={loadMoreArticles}
        setDisplayedArticlesCount={setDisplayedArticlesCount}
        handleDeleteArticle={handleDeleteArticle}
        handleSaveArticle={handleSaveArticle}
      />
      <About />
    </main>
  );
}

export default Main;
