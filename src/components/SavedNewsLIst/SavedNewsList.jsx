import "./SavedNewsList.css";
import { useContext } from "react";
import { UserArticleContext } from "../../contexts/UserArticleContext";
import { CurrentUserContext } from "../../contexts/currentUserContext";
import { savedNewsData } from "../../utils/stubSavedNewsList";
import { useState } from "react";
import NewsCard from "../NewsCard/NewsCard";

function SavedCardsList({ displayedArticles, handleDeleteArticle }) {
  // const { userArticles } = useContext(UserArticleContext);
  // const { currentUser } = useContext(CurrentUserContext);

  // Use the logic below when not using stubbed data
  // function SavedCardsList({ handleDeleteArticle }) {
  //   const { userArticles } = useContext(UserArticleContext);
  //   const { currentUser } = useContext(CurrentUserContext);

  // Safeguard against missing data
  // const userSpecificArticles =
  //   currentUser?.email && Array.isArray(userArticles)
  //     ? userArticles.filter((article) => article.savedBy === currentUser.email)
  //     : [];

  return (
    <ul className="saved-news__list">
      {displayedArticles.map((article, index) => (
        <NewsCard
          handleDeleteArticle={() => handleDeleteArticle(article.link)}
          article={article}
          key={`${article.link}-${index}`}
        />
      ))}
    </ul>
  );
}

export default SavedCardsList;


// Component without stub data
// function SavedCardsList({ handleDeleteArticle }) {
//   const { userArticles } = useContext(UserArticleContext);
//   const { currentUser } = useContext(CurrentUserContext);

//   const userSpecificArticles =
//     currentUser?.email && Array.isArray(userArticles)
//       ? userArticles.filter((article) => article.savedBy === currentUser.email)
//       : [];

//   return (
//     <>
//       <ul className="saved-news__list">
//         {userSpecificArticles?.map((article, index) => {
//           return (
//             <NewsCard
//               handleDeleteArticle={handleDeleteArticle}
//               article={article}
//               key={`${article.link}-${index}`} // Combine link and index for unique key
//             />
//           );
//         })}
//       </ul>
//     </>
//   );
// }