import { Routes, Route } from "react-router-dom";

import "./App.css";

import Main from "../Main/Main";
import Footer from "../Footer/Footer";

function App() {
  return (
    <div className="page">
      <div className="page_content">
        <Routes>
          <Route path="/" element={<Main />}></Route>
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
