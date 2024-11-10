import Navigation from "../Navigation/Navigation";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import "./SavedNews.css";

function SavedNews() {
  return (
    <div className="saved-news">
      <Navigation />
      <SavedNewsHeader />
    </div>
  );
}

export default SavedNews;
