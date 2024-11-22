import "../NewsCard/NewsCard.css";
import { useLocation } from "react-router";
import { useContext } from "react";
import { UserArticleContext } from "../../contexts/UserArticleContext";

function NewsCard({
  article,
  isLoggedIn,
  setActiveModal,
  handleSaveArticle,
  handleDeleteArticle,
}) {
  const location = useLocation();
  const { userArticles } = useContext(UserArticleContext);

  const source =
    location.pathname === "/"
      ? article.source.name?.toUpperCase().split(".")[0]
      : article.source?.toUpperCase().split(".")[0];

  const dateInWords = new Date(
    location.pathname === "/" ? article.publishedAt : article.date
  ).toLocaleString("default", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const isSaved = userArticles.some((existingArticle) => {
    return existingArticle.link === (article.url || article.link);
  });

  const handleSaveClick = () => {
    if (isLoggedIn) {
      handleSaveArticle(article);
    } else {
      setActiveModal("login");
    }
  };

  const handleDeleteClick = () => {
    console.log("Deleting article with link:", article.link); // Log the link passed
    handleDeleteArticle(article.link);
  };

  return (
    <div className="news-card__container">
      <div className="news-card__image-container">
        {location.pathname === "/saved-news" && (
          <div className="news-card__keyword-icon">
            <div className="news-card__keyword-text">{article.keyword}</div>
          </div>
        )}
        <div className="news-card__btns">
          {!isLoggedIn && location.pathname === "/" && (
            <div className="news-card__sign-in-icon">
              Sign in to save articles
            </div>
          )}
          {location.pathname === "/" && (
            <button
              className={
                isSaved
                  ? "news-card__save-btn news-card__save-btn_active"
                  : "news-card__save-btn"
              }
              onClick={handleSaveClick}
              disabled={!isLoggedIn} // Disable the button when not logged in
            ></button>
          )}
          {location.pathname === "/saved-news" && (
            <div className="news-card__btns">
              <div className="news-card__delete-btn-message">
                Remove from saved
              </div>
              <button
                className="news-card__delete-btn"
                onClick={handleDeleteClick}
              ></button>
            </div>
          )}
        </div>
        <img
          src={location.pathname === "/" ? article.urlToImage : article.image}
          alt={article.title}
          className="news-card__image"
        />
      </div>
      <div className="news-card__text">
        <span className="news-card__date">{dateInWords}</span>
        <a
          href={location.pathname === "/" ? article.url : article.link}
          target="_blank"
          rel="noopener noreferrer"
          className="news-card__title-link"
        >
          <h2 className="news-card__title">{article.title}</h2>
        </a>
        <p className="news-card__description">
          {location.pathname === "/" ? article.description : article.text}
        </p>
        <span className="news-card__source">{source}</span>
      </div>
    </div>
  );
}

export default NewsCard;
