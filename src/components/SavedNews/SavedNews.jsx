import Nav from "../Nav/Nav";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import { pageAppearance } from "../../utils/pageAppearance";
import SavedCardsList from "../SavedNewsLIst/SavedNewsList";
import { useState } from "react";
import { savedNewsData } from "../../utils/stubSavedNewsList";

function SavedNews({
  isLoggedIn,
  handleLogout,
  username,
  handleDeleteArticle,
  userArticles,
}) {
  const isInverse = pageAppearance.home === "dark";

  // Local state to manage stubbed saved cards
  const [mockedSavedCards, setMockedSavedCards] = useState(savedNewsData);

  // Combine stubbed data with API data
  const displayedArticles = [
    ...mockedSavedCards, // Include stubbed data
    ...userArticles, // Include user-specific API articles
  ];

  // Extract unique keywords
  const keywords = displayedArticles
    .map((article) => article.keyword)
    .filter((keyword, index, self) => self.indexOf(keyword) === index);

  // Mock delete function for stubbed cards
  const handleMockDeleteArticle = (articleLink) => {
    console.log("Deleting stub card with link:", articleLink);

    setMockedSavedCards((prevCards) => {
      const updatedCards = prevCards.filter(
        (card) => card.link !== articleLink
      );
      console.log("Updated mocked saved cards:", updatedCards);
      return [...updatedCards]; // Create a new array reference
    });
  };

  // Unified delete handler for stubbed and API cards
  const deleteArticleHandler = (articleLink) => {
    console.log(
      "Mocked saved cards:",
      mockedSavedCards.map((card) => card.link)
    );
    console.log("Article link to delete:", articleLink);

    const isStub = mockedSavedCards.some((stub) => stub.link === articleLink);
    console.log("Is the article a stub:", isStub);

    if (isStub) {
      handleMockDeleteArticle(articleLink); // Delete from stubbed data
    } else {
      handleDeleteArticle(articleLink); // Delete from API data
    }
  };

  return (
    <div className="saved-news">
      <Nav
        isInverse={isInverse}
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
        username={username}
      />
      <SavedNewsHeader
        username={username}
        articleCount={displayedArticles.length}
        keywords={keywords}
      />
      <SavedCardsList
        displayedArticles={displayedArticles}
        handleDeleteArticle={deleteArticleHandler}
      />
    </div>
  );
}

export default SavedNews;

// Component without stub data

// function SavedNews({
//   isLoggedIn,
//   handleLogout,
//   username,
//   handleDeleteArticle,
//   userArticles,
// }) {
//   const isInverse = pageAppearance.home === "dark";

//   return (
//     <div className="saved-news">
//       <Nav
//         isInverse={isInverse}
//         isLoggedIn={isLoggedIn}
//         handleLogout={handleLogout}
//         username={username}
//       />
//       <SavedNewsHeader />
//       <SavedCardsList
//         handleDeleteArticle={handleDeleteArticle}
//         userArticles={userArticles}
//       />
//     </div>
//   );
// }

// export default SavedNews;
