import "../SavedNewsHeader/SavedNewsHeader.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/currentUserContext";
import { UserArticleContext } from "../../contexts/UserArticleContext";

function SavedNewsHeader() {
  const { currentUser } = useContext(CurrentUserContext);
  const { userArticles } = useContext(UserArticleContext);

  // Filter articles saved by the logged-in user
  const userSpecificArticles = userArticles.filter(
    (article) => article.savedBy === currentUser.email
  );

  const keywords = userSpecificArticles
    .map((article) => article.keyword)
    .filter((keyword, index, self) => self.indexOf(keyword) === index);

  return (
    <section className="saved-news-header">
      <h3 className="saved-news-header__title">Saved articles</h3>
      <p className="saved-news-header__subtitle">
        {currentUser.username}, you have{" "}
        <span className="saved-news-header__article-count">
          {userArticles.length}
        </span>{" "}
        saved article{userArticles.length !== 1 && "s"}.
      </p>

      <p className="saved-news-header__keywords">
        By keywords:{" "}
        <span className="saved-news-header__keywords_bold">
          {keywords.length > 2
            ? `${keywords[0]}, ${keywords[1]}, and ${
                keywords.length - 2
              } other${keywords.length > 3 ? "s" : ""}`
            : keywords.length === 2
            ? `${keywords[0]} and ${keywords[1]}`
            : keywords.length === 1
            ? keywords[0]
            : "no keywords yet"}
        </span>
      </p>
    </section>
  );
}

export default SavedNewsHeader;
