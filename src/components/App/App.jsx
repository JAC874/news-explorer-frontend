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
    if (currentKeyword === "") {
      setIsSuccessNewsData(true);
      return;
    }

    setIsLoading(true);
    setNewsData([]);
    setIsSuccessNewsData(false);
    setIsError(false);
  
    getNews(currentKeyword, APIKey, getLastWeeksDate(), getTodaysDate())
      .then((data) => {
        setIsSuccessNewsData(true);
        setNewsData(data.articles);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetcing news:", err);
        setIsError(true);
      });
  }
  // const handleRegistration = (values, resetRegistrationForm) => {
  //   if (!values) return;

  //   registerUser(values)
  //     .then((res) => {
  //       console.log(res);
  //       setIsLoggedIn(true);
  //       setCurrentUser(res.data);
  //       resetRegistrationForm();
  //       closeActiveModal();
  //       setActiveModal("success");
  //     })
  //     .catch((res) => {
  //       console.log(`There is an error in handleUserRegistration: ${res}`);
  //     });
  // };

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
        // handleRegistration={handleRegistration}
      />

      {/* Temporary buttons to manually toggle login state */}
      <button onClick={handleLogin}>Log In (Manual Test)</button>
      <button onClick={handleLogout}>Log Out (Manual Test)</button>
    </div>
  );
}

export default App;
