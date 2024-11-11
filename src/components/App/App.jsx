import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";

import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import SavedNews from "../SavedNews/SavedNews";
import { articleData } from "../../utils/stubResponse"; // Import the stub data

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [newsData, setNewsData] = useState([]);
  const [isSuccessNewsData, setIsSuccessNewsData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentKeyword, setCurrentKeyword] = useState("");

  const navigate = useNavigate();

  // Manually set login state to true
  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate("/");
    setActiveModal(""); // Close any open modal, if desired
    console.log("logged in");
  };

  // Manually set login state to false
  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
    console.log("logged out");
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
    // If the search keyword is empty, clear results and set success to true
    if (currentKeyword === "") {
      setIsSuccessNewsData(true);
      setNewsData([]); // Clear any existing news data
      return;
    }

    // Set loading state and reset other states before filtering
    setIsLoading(true);
    setNewsData([]); // Clear previous news data
    setIsSuccessNewsData(false); // Reset success state
    setIsError(false); // Reset error state

    // Simulate API call with setTimeout
    setTimeout(() => {
      setIsLoading(false); // Stop loading spinner

      // Filter stub data based on the current keyword
      const filteredData = articleData.filter(
        (article) =>
          article.title.toLowerCase().includes(currentKeyword.toLowerCase()) ||
          article.description
            .toLowerCase()
            .includes(currentKeyword.toLowerCase())
      );

      // Set news data with the filtered results
      setNewsData(filteredData);

      // Set success state based on whether results were found
      setIsSuccessNewsData(filteredData.length > 0);
    }, 1000); // Simulate a delay
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
              />
            }
          ></Route>
          <Route
            path="/saved-news"
            element={
              <SavedNews isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
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
      />

      {/* Temporary buttons to manually toggle login state */}
      <button onClick={handleLogin}>Log In (Manual Test)</button>
      <button onClick={handleLogout}>Log Out (Manual Test)</button>
    </div>
  );
}

export default App;
