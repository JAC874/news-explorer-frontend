import "../NewsCardList/NewsCardList.css";

import notFound from "../../assets/not-found-img.svg";
import Preloader from "../Preloader/Preloader";

function NewsCardList() {
  return (
    <section className="news-card-list">
      {/* NOT FOUND */}
      <div className="news-card-list__not-found">
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
      <div className="news-card-list__preloader">
        <Preloader />
        <h3 className="news-card-list__preloader-text">
          Searching for news...
        </h3>
      </div>
      <h2 className="news-card-list__title">Search results</h2>
      <div className="news-card-list__container">
        <ul className="news-card-list__list">NEWS CARDS</ul>
      </div>
      <button className="news-card-list__more-btn">Show more</button>
    </section>
  );
}

export default NewsCardList;
