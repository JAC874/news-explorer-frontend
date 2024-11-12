import { checkServerResponse } from "./Api";
const baseUrl = "https://newsapi.org/v2/everything";

export const getNews = (q, apiKey, from, to) => {
  console.log("is this running");
  console.log(
    "Fetching URL:",
    `${baseUrl}?q=${q}&from=${from}&to=${to}&pageSize=100&apiKey=${apiKey}`
  );
  console.log(apiKey);
  return fetch(
    `${baseUrl}?q=${q}&from=${from}&to=${to}&pageSize=100&apiKey=${apiKey}`
  ).then(checkServerResponse);
};
