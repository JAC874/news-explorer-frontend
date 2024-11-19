import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";

import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import SavedNews from "../SavedNews/SavedNews";
import SuccessModal from "../SuccessModal/SuccesModal";
import { getNews } from "../../utils/newsApi";
import { getUserArticles, saveArticle, deleteArticle } from "../../utils/Api";
import { APIKey } from "../../utils/constants";
import { getTodaysDate, getLastWeeksDate } from "../../utils/Dates";
import { CurrentUserContext } from "../../contexts/currentUserContext";
import { UserArticleContext } from "../../contexts/UserArticleContext";

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {
      email: "",
      password: "",
      username: "",
      isLoggedIn: false,
    };
    return storedUser;
  });
  const [userArticles, setUserArticles] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(currentUser.isLoggedIn || false);
  const [activeModal, setActiveModal] = useState("");
  const [newsData, setNewsData] = useState([]);
  const [isSuccessNewsData, setIsSuccessNewsData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentKeyword, setCurrentKeyword] = useState("");
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [username, setUsername] = useState(currentUser.username || "");

  const navigate = useNavigate();

  const userContext = {
    currentUser,
    setCurrentUser,
  };

  const userArticleContext = {
    userArticles,
    setUserArticles,
  };

  const handleRegistration = ({ username, password, email }, resetForm) => {
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    if (existingUsers.some((user) => user.email === email)) {
      console.error("User already exists.");
      return;
    }

    const newUser = { username, email, password, isLoggedIn: false };
    const updatedUsers = [...existingUsers, newUser];

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    resetForm();
    setActiveModal("success");
  };

  const handleLogin = (email, password) => {
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userToLogin = existingUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (userToLogin) {
      userToLogin.isLoggedIn = true;

      const updatedUsers = existingUsers.map((user) =>
        user.email === email ? userToLogin : user
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      setCurrentUser(userToLogin);
      setIsLoggedIn(true);

      const storedArticles =
        JSON.parse(localStorage.getItem("userArticles")) || [];
      const userSpecificArticles = storedArticles.filter(
        (article) => article.savedBy === email
      );
      setUserArticles(userSpecificArticles);

      setActiveModal("");
      navigate("/");
    } else {
      console.error("Invalid email or password.");
    }
  };

  const handleLogout = () => {
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = existingUsers.map((user) =>
      user.email === currentUser.email ? { ...user, isLoggedIn: false } : user
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setCurrentUser({
      email: "",
      password: "",
      username: "",
      isLoggedIn: false,
    });
    setIsLoggedIn(false);
    setUserArticles([]);
    setNewsData([]); // Reset the NewsCard list
    setCurrentKeyword(""); // Reset the search keyword
    setIsSuccessNewsData(false); // Reset success state
    setIsLoading(false); // Reset loading state
    setIsError(false); // Reset error state

    navigate("/");
  };

  const handleSearchSubmit = () => {
    if (!currentKeyword) {
      setIsSuccessNewsData(true);
      return;
    }

    setIsLoading(true);
    setIsSuccessNewsData(false);
    setIsError(false);
    setNewsData([]);
    setCurrentPage(1);

    getNews(currentKeyword, APIKey, getLastWeeksDate(), getTodaysDate())
      .then((data) => {
        setTotalResults(data.totalResults);
        setNewsData(data.articles);
        setIsSuccessNewsData(true);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching news:", err);
        setIsError(true);
      });
  };

  const handleSaveArticle = (article) => {
    const keyword = currentKeyword
      ? currentKeyword[0].toUpperCase() + currentKeyword.slice(1)
      : "Default";
    const newArticle = {
      keyword,
      title: article.title,
      text: article.description,
      date: article.publishedAt,
      source: article.source.name,
      link: article.url,
      image: article.urlToImage,
      savedBy: currentUser.email,
    };

    // Check if the article is already saved by the current user
    const isAlreadySaved = userArticles.some(
      (existingArticle) =>
        existingArticle.link === newArticle.link &&
        existingArticle.savedBy === currentUser.email
    );

    if (isAlreadySaved) {
      console.log("This article is already saved.");
      return;
    }

    saveArticle(newArticle)
      .then((savedArticle) => {
        setUserArticles((prev) => [...prev, savedArticle]);
      })
      .catch((err) => console.error("Error saving article:", err));
  };

  const handleDeleteArticle = (link) => {
    deleteArticle(link)
      .then(() => {
        const updatedArticles = userArticles.filter(
          (article) => article.link !== link
        );
        setUserArticles(updatedArticles);
        localStorage.setItem(
          `articles_${currentUser.email}`,
          JSON.stringify(updatedArticles)
        );
      })
      .catch((err) => console.error("Error deleting article:", err));
  };

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const loggedInUser = storedUsers.find((user) => user.isLoggedIn);

    if (loggedInUser) {
      setCurrentUser(loggedInUser);
      setIsLoggedIn(true);

      getUserArticles().then((articles) => {
        const userSpecificArticles = articles.filter(
          (article) => article.savedBy === loggedInUser.email
        );
        setUserArticles(userSpecificArticles);
      });
    }
  }, []);

  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        setActiveModal("");
      }
    };

    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  return (
    <CurrentUserContext.Provider value={userContext}>
      <UserArticleContext.Provider value={userArticleContext}>
        <div className="page">
          <div className="page_content">
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    handleLoginClick={() => setActiveModal("login")}
                    setActiveModal={setActiveModal}
                    isLoggedIn={isLoggedIn}
                    handleLogout={handleLogout}
                    newsData={newsData}
                    isSuccess={isSuccessNewsData}
                    isLoading={isLoading}
                    isError={isError}
                    handleSearchSubmit={handleSearchSubmit}
                    setCurrentKeyword={setCurrentKeyword}
                    totalResults={totalResults}
                    loadMoreArticles={() => {}}
                    username={username}
                    handleSaveArticle={handleSaveArticle}
                    handleDeleteArticle={handleDeleteArticle}
                  />
                }
              />
              <Route
                path="/saved-news"
                element={
                  <SavedNews
                    isLoggedIn={isLoggedIn}
                    handleLogout={handleLogout}
                    username={username}
                    handleDeleteArticle={handleDeleteArticle}
                    userArticles={userArticles}
                  />
                }
              />
            </Routes>
            <Footer />
          </div>
          <LoginModal
            isOpen={activeModal === "login"}
            onClose={() => setActiveModal("")}
            setActiveModal={setActiveModal}
            handleLogin={handleLogin}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={() => setActiveModal("")}
            setActiveModal={setActiveModal}
            handleRegistration={handleRegistration}
          />
          <SuccessModal
            isOpen={activeModal === "success"}
            onClose={() => setActiveModal("")}
            setActiveModal={setActiveModal}
          />
        </div>
      </UserArticleContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
