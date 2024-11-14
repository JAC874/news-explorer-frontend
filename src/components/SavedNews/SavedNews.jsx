import Nav from "../Nav/Nav";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
// import news list
import { pageAppearance } from "../../utils/pageAppearance";

function SavedNews({ isLoggedIn, handleLogout, username }) {
  const isInverse = pageAppearance.home === "dark";

  return (
    <div className="saved-news">
      <Nav
        isInverse={isInverse}
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
        username={username}
      />
      <SavedNewsHeader />
    </div>
  );
}

export default SavedNews;
