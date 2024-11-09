import { Routes, Route } from "react-router-dom";

import "./App.css";

import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal";

function App() {
  return (
    <div className="page">
      <div className="page_content">
        <Routes>
          <Route path="/" element={<Main />}></Route>
        </Routes>
        <Footer />
      </div>
      <LoginModal />
    </div>
  );
}

export default App;
