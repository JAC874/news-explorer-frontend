import "../NewsCard/NewsCard.css";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

function NewsCard({ article, isLoggedIn }) {
  const location = useLocation();
  const handleDeleteClick = () => {
    // Define the delete functionality here
    console.log("Delete button clicked");
  };

  const source =
    location.pathname === "/"
      ? article.source.name.toUpperCase().split(".")[0]
      : article.source.toUpperCase().split(".")[0];
  const dateInWords = new Date(
    location.pathname === "/" ? article.publishedAt : article.date
  ).toLocaleString("default", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="news-card__container">
      <div className="news-card__image-container">
        <div className="news-card__btns">
          {!isLoggedIn && location.pathname === "/" && (
            <div className="news-card__sign-in-icon">
              Sign in to save articles
            </div>
          )}
          <button className="news-card__save-btn">save</button>
          {location.pathname === "/saved-news" && (
            <button
              className="news-card__delete"
              onClick={handleDeleteClick}
            ></button>
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
        <Link
          to={article.link}
          target="_blank"
          className="news-card__title-link"
        >
          <h2 className="news-card__title">{article.title}</h2>
        </Link>
        <p className="news-card__description">
          {location.pathname === "/" ? article.description : article.text}
        </p>
        <span className="news-card__source">{source}</span>
      </div>
    </div>
  );
}

export default NewsCard;
