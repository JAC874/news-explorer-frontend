import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";

import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import SavedNews from "../SavedNews/SavedNews";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeModal, setActiveModal] = useState("");

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
              />
            }
          ></Route>
          <Route path="/saved-news" element={<SavedNews />}></Route>
        </Routes>
        <Footer />
      </div>
      <LoginModal
        isOpen={activeModal === "login"}
        onClose={closeActiveModal}
        setActiveModal={setActiveModal}
      />
      <RegisterModal
        isOpen={activeModal === "register"}
        onClose={closeActiveModal}
        setActiveModal={setActiveModal}
      />
    </div>
  );
}

export default App;
