import Header from "../Header/Header";
import About from "../About/About";
import NewsCardList from "../NewsCardList/NewsCardList";

function Main({ handleLoginClick }) {
  return (
    <main>
      <Header handleLoginClick={handleLoginClick} />
      <NewsCardList />
      <About />
    </main>
  );
}

export default Main;
