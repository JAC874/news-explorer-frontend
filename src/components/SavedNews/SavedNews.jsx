import Nav from "../Nav/Nav";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import { pageAppearance } from "../../utils/pageAppearance";
import SavedCardsList from "../SavedNewsLIst/SavedNewsList";

function SavedNews({
  isLoggedIn,
  handleLogout,
  username,
  handleDeleteArticle,
  userArticles,
}) {
  const isInverse = pageAppearance.home === "dark";

  return (
    <div className="saved-news">
      <Nav
        isInverse={isInverse}
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
        username={username}
      />
      <SavedNewsHeader />
      <SavedCardsList
        handleDeleteArticle={handleDeleteArticle}
        userArticles={userArticles}
      />
    </div>
  );
}

export default SavedNews;
