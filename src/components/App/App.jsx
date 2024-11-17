import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";

import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import SavedNews from "../SavedNews/SavedNews";
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
  const [userArticles, setUserArticles] = useState(() => {
    const storedArticles = JSON.parse(localStorage.getItem("userArticles"));
    return storedArticles || []; // Initialize from localStorage
  });
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
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
      storedUser &&
      storedUser.email === email &&
      storedUser.password === password
    ) {
      storedUser.isLoggedIn = true;
      localStorage.setItem("user", JSON.stringify(storedUser));
      setCurrentUser(storedUser);
      setIsLoggedIn(true);
      setUsername(storedUser.username);
      navigate("/");
      setActiveModal("");
    } else {
      console.error("Invalid email or password");
    }
  };

  const handleLogout = () => {
    const updatedUser = { ...currentUser, isLoggedIn: false };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setCurrentUser(updatedUser);
    setIsLoggedIn(false);
    setUsername("");
    navigate("/");
  };

  const handleRegistration = ({ username, password, email }, resetForm) => {
    const existingUser = JSON.parse(localStorage.getItem("user"));
    if (existingUser && existingUser.email === email) {
      return;
    }

    const newUser = { username, email, password, isLoggedIn: false };
    localStorage.setItem("user", JSON.stringify(newUser));
    setCurrentUser(newUser);
    resetForm();
    setActiveModal("login");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    const storedArticles =
      JSON.parse(localStorage.getItem("userArticles")) || [];
    setUserArticles(storedArticles);
  }, []);

  useEffect(() => {
    localStorage.setItem("userArticles", JSON.stringify(userArticles));
  }, [userArticles]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setCurrentUser(storedUser);
      setIsLoggedIn(storedUser.isLoggedIn || false);
      setUsername(storedUser.username || "");
    }
  }, []);

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

    if (
      userArticles.some((existingArticle) => {
        return existingArticle.link === article.url;
      })
    ) {
      const unSavedArticle = userArticles.find(
        (existingArticle) => existingArticle.link === article.url
      );
      setUserArticles((prevArticles) =>
        prevArticles.filter((article) => article !== unSavedArticle)
      );
      return;
    }

    const newArticle = {
      keyword: keyword,
      title: article.title,
      text: article.description,
      date: article.publishedAt,
      source: article.source.name,
      link: article.url,
      image: article.urlToImage,
      savedBy: currentUser.email,
    };

    setUserArticles((prevArticles) => [...prevArticles, newArticle]);
  };

  const handleDeleteArticle = (link) => {
    setUserArticles((prevArticles) =>
      prevArticles.filter(
        (article) =>
          !(article.link === link && article.savedBy === currentUser.email)
      )
    );
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
        </div>
      </UserArticleContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
