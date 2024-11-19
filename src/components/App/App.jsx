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
import { APIKey } from "../../utils/constants";
import { getTodaysDate, getLastWeeksDate } from "../../utils/Dates";
import { CurrentUserContext } from "../../contexts/currentUserContext";
import { UserArticleContext } from "../../contexts/UserArticleContext";

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    return (
      storedUser || { email: "", password: "", username: "", isLoggedIn: false }
    );
  });
  const [userArticles, setUserArticles] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [newsData, setNewsData] = useState([]);
  const [isSuccessNewsData, setIsSuccessNewsData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentKeyword, setCurrentKeyword] = useState("");
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const userContext = {
    currentUser,
    setCurrentUser,
  };

  const userArticleContext = {
    userArticles,
    setUserArticles,
  };

  const handleLogin = (email, password) => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    const userToLogin = storedUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (userToLogin) {
      userToLogin.isLoggedIn = true;

      const updatedUsers = storedUsers.map((user) =>
        user.email === email ? userToLogin : user
      );

      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setCurrentUser(userToLogin);
      setIsLoggedIn(true);
      setUsername(userToLogin.username);

      // Load articles specific to the logged-in user
      const userSpecificArticles =
        JSON.parse(localStorage.getItem(email)) || [];
      setUserArticles(userSpecificArticles);

      navigate("/");
      setActiveModal("");
    } else {
      console.error("Invalid email or password");
    }
  };

  const handleLogout = () => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = storedUsers.map((user) =>
      user.email === currentUser.email ? { ...user, isLoggedIn: false } : user
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Reset state for current user and articles
    setCurrentUser({
      email: "",
      password: "",
      username: "",
      isLoggedIn: false,
    });
    setIsLoggedIn(false);
    setUsername("");
    setUserArticles([]); // Clear articles in state

    navigate("/");
  };

  const handleRegistration = ({ username, password, email }, resetForm) => {
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Check if the email is already registered
    if (existingUsers.some((user) => user.email === email)) {
      console.error("User already exists.");
      return;
    }

    const newUser = { username, email, password, isLoggedIn: false };
    const updatedUsers = [...existingUsers, newUser];

    localStorage.setItem("users", JSON.stringify(updatedUsers)); // Save the array of users
    resetForm();
    setActiveModal("success");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const loggedInUser = storedUsers.find((user) => user.isLoggedIn);

    if (loggedInUser) {
      setCurrentUser(loggedInUser);
      setIsLoggedIn(true);
      setUsername(loggedInUser.username);

      // Load user-specific articles
      const userSpecificArticles =
        JSON.parse(localStorage.getItem(loggedInUser.email)) || [];
      setUserArticles(userSpecificArticles);
    }
  }, []);

  useEffect(() => {
    if (currentUser.email) {
      localStorage.setItem(currentUser.email, JSON.stringify(userArticles));
    }
  }, [userArticles, currentUser.email]);

  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  function handleSearchSubmit() {
    if (currentKeyword === "") {
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
  }

  function loadMoreArticles() {
    const nextPage = currentPage + 1;
    setIsLoading(true);

    getNews(
      currentKeyword,
      APIKey,
      getLastWeeksDate(),
      getTodaysDate(),
      nextPage
    )
      .then((data) => {
        setNewsData((prevData) => [...prevData, ...data.articles]);
        setCurrentPage(nextPage);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching more news:", err);
        setIsError(true);
      });
  }

  const handleSaveArticle = (article) => {
    const keyword = currentKeyword[0].toUpperCase() + currentKeyword.slice(1);

    const newArticle = {
      keyword,
      title: article.title,
      text: article.description,
      date: article.publishedAt,
      source: article.source.name,
      link: article.url,
      image: article.urlToImage,
      savedBy: currentUser.email, // Associate with current user
    };

    // Check if the article is already saved by the user
    const isAlreadySaved = userArticles.some(
      (existingArticle) =>
        existingArticle.link === article.url &&
        existingArticle.savedBy === currentUser.email
    );

    if (isAlreadySaved) {
      console.log("Article already saved.");
      return;
    }

    const updatedArticles = [...userArticles, newArticle];
    setUserArticles(updatedArticles);
  };

  const handleDeleteArticle = (link) => {
    const updatedArticles = userArticles.filter(
      (article) =>
        !(article.link === link && article.savedBy === currentUser.email)
    );
    setUserArticles(updatedArticles);
  };

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
                    handleLoginClick={handleLoginClick}
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
                    loadMoreArticles={loadMoreArticles}
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
            onClose={closeActiveModal}
            setActiveModal={setActiveModal}
            handleLogin={handleLogin}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeActiveModal}
            setActiveModal={setActiveModal}
            handleRegistration={handleRegistration}
          />
          <SuccessModal
            isOpen={activeModal === "success"}
            onClose={closeActiveModal}
            setActiveModal={setActiveModal}
          />
        </div>
      </UserArticleContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
