// getToken

export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://nomoreparties.co/news/v2/everything?"
    : "https://newsapi.org/v2/everything?";

export const checkServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

// Simulate saving an article
function saveArticle({
  keyword,
  title,
  text,
  date,
  source,
  link,
  image,
  savedBy,
}) {
  const storedArticles = JSON.parse(localStorage.getItem("userArticles")) || [];
  const newArticle = {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    savedBy,
  };

  localStorage.setItem(
    "userArticles",
    JSON.stringify([...storedArticles, newArticle])
  );

  return Promise.resolve(newArticle); // Simulate a successful response
}

// Simulate deleting an article
function deleteArticle(link) {
  const storedArticles = JSON.parse(localStorage.getItem("userArticles")) || [];
  const updatedArticles = storedArticles.filter(
    (article) => article.link !== link
  );

  localStorage.setItem("userArticles", JSON.stringify(updatedArticles));

  return Promise.resolve({ message: "Article deleted" }); // Simulate a successful response
}

// Simulate fetching user articles
function getUserArticles() {
  const storedArticles = JSON.parse(localStorage.getItem("userArticles")) || [];
  return Promise.resolve(storedArticles); // Simulate a successful response
}

function getUser() {
  const user = JSON.parse(localStorage.getItem("user"));
  return Promise.resolve(user); // Simulate fetching user data
}

export { getUserArticles, deleteArticle, saveArticle, getUser };
