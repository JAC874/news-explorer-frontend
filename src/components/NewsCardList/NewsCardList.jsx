import "../NewsCardList/NewsCardList.css";
import { useState } from "react";

import notFound from "../../assets/not-found-img.svg";
import Preloader from "../Preloader/Preloader";
import NewsCard from "../NewsCard/NewsCard";

import { articleData } from "../../utils/stubResponse"; // Import the article data

function NewsCardList({
  isLoggedIn,
  newsData,
  isSuccess,
  isLoading,
  isError,
  currentKeyword,
  handleDeleteArticle,
  handleSaveArticle,
}) {
  const filteredNewsData = Array.isArray(newsData)
    ? newsData
        .filter((article) => article.title !== "[Removed]")
        .filter((article) =>
          currentKeyword
            ? article.title
                .toLowerCase()
                .includes(currentKeyword.toLowerCase()) ||
              article.description
                .toLowerCase()
                .includes(currentKeyword.toLowerCase())
            : true
        )
    : [];

  const [activeNewsDataLength, setActiveNewsDataLength] = useState(3);
  const activeNewsDataItems = filteredNewsData.slice(0, activeNewsDataLength);

  const handleOnClick = () => {
    setActiveNewsDataLength((prevState) => prevState + 3);
  };

  const isInitialState =
    newsData.length === 0 && !isSuccess && !isError && !isLoading;
  const emptyNewsDataArray = newsData.length === 0 && isSuccess;

  return (
    <section
      className={
        isInitialState
          ? " news-card-list news-card-list_hidden"
          : "news-card-list"
      }
    >
      {/* NOT FOUND */}
      <div
        className={
          emptyNewsDataArray
            ? "news-card-list__not-found"
            : "news-card-list__not-found news-card-list__not-found_hidden"
        }
      >
        <img
          src={notFound}
          alt="magnifying glass with sad face"
          className="news-card-list__not-found-icon"
        />
        <h3 className="news-card-list__not-found-title">Nothing found</h3>
        <p className="news-card-list__not-found-subtitle">
          Sorry, but nothing matched your search terms.
        </p>
      </div>

      {/* PRELOADER */}
      <div
        className={
          isLoading
            ? "news-card-list__preloader"
            : "news-card-list__preloader news-card-list__preloader_hidden"
        }
      >
        <Preloader />
        <h3 className="news-card-list__preloader-text">
          Searching for news...
        </h3>
      </div>
      <h2 className="news-card-list__title">Search results</h2>
      <div className="news-card-list__container">
        <ul className="news-card-list__list">
          {activeNewsDataItems.map((article, index) => (
            <NewsCard
              key={index}
              isLoggedIn={isLoggedIn}
              article={article}
              handleDeleteArticle={handleDeleteArticle}
              handleSaveArticle={handleSaveArticle}
            />
          ))}
        </ul>
      </div>
      {activeNewsDataLength < filteredNewsData.length && (
        <button onClick={handleOnClick} className="news-card-list__more-btn">
          Show more
        </button>
      )}
    </section>
  );
}

export default NewsCardList;
