import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";

import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import SavedNews from "../SavedNews/SavedNews";
import { articleData } from "../../utils/stubResponse"; // Import the stub data
import { getNews } from "../../utils/newsApi";
import { APIKey } from "../../utils/constants";
import { getTodaysDate, getLastWeeksDate } from "../../utils/Dates";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [newsData, setNewsData] = useState([]);
  const [isSuccessNewsData, setIsSuccessNewsData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentKeyword, setCurrentKeyword] = useState("");
  const [totalResults, setTotalResults] = useState(0); // Track total articles
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setIsLoggedIn(storedUser.isLoggedIn || false);
      setUsername(storedUser.username || "");
    }
  }, []);

  const handleLogin = (email, password) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
      storedUser &&
      storedUser.email === email && // Check if email matches
      storedUser.password === password // Check if password matches
    ) {
      storedUser.isLoggedIn = true;
      localStorage.setItem("user", JSON.stringify(storedUser));
      setIsLoggedIn(true);
      setUsername(storedUser.username);
      navigate("/");
      setActiveModal(""); // Close the login modal
    } else {
      console.error("Invalid email or password");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername(""); // Clear username on logout
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      storedUser.isLoggedIn = false; // Update isLoggedIn to false
      localStorage.setItem("user", JSON.stringify(storedUser)); // Save the updated object
    }
    navigate("/");
  };

  const handleRegistration = ({ username, password, email }, resetForm) => {
    // Check if user already exists
    const existingUser = JSON.parse(localStorage.getItem("user"));
    if (existingUser && existingUser.email === email) {
      return;
    }

    // Prepare user data to be saved
    const userData = { username, password, email, isLoggedIn: false };

    // Save to localStorage
    localStorage.setItem("user", JSON.stringify(userData));

    // Reset the form and switch to login modal
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
        console.error("Error fetcing news:", err);
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

  return (
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
              />
            }
          ></Route>
          <Route
            path="/saved-news"
            element={
              <SavedNews
                isLoggedIn={isLoggedIn}
                handleLogout={handleLogout}
                username={username}
              />
            }
          ></Route>
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
  );
}

export default App;
