import Nav from "../Nav/Nav";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
// import news list
import { pageAppearance } from "../../utils/pageAppearance";

function SavedNews({ isLoggedIn, handleLogout }) {
  const isInverse = pageAppearance.home === "dark";

  return (
    <div className="saved-news">
      <Nav
        isInverse={isInverse}
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
      />
      <SavedNewsHeader />
    </div>
  );
}

export default SavedNews;
