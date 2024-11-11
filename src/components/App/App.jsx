import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";

import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import SavedNews from "../SavedNews/SavedNews";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeModal, setActiveModal] = useState("");

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

  // // Optional effect: perform actions when user logs in
  // useEffect(() => {
  //   if (!isLoggedIn) return;
  //   console.log("User logged in!");
  //   // Add any other actions on login, such as fetching user data
  // }, [isLoggedIn]);

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
