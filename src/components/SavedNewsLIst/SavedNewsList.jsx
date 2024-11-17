import "./SavedNewsList.css";

import { useContext } from "react";
import { UserArticleContext } from "../../contexts/UserArticleContext";
import { CurrentUserContext } from "../../contexts/currentUserContext";

import NewsCard from "../NewsCard/NewsCard";

function SavedCardsList({ handleDeleteArticle }) {
  const { userArticles } = useContext(UserArticleContext);
  const { currentUser } = useContext(CurrentUserContext);

  const userSpecificArticles = userArticles.filter(
    (article) => article.savedBy === currentUser.email
  );

  return (
    <>
      <ul className="saved-news__list">
        {userSpecificArticles?.map((article) => {
          return (
            <NewsCard
              handleDeleteArticle={handleDeleteArticle}
              article={article}
              key={article.link}
            />
          );
        })}
      </ul>
    </>
  );
}

export default SavedCardsList;
