import api from "./api";
// import random from "./random";

const checkAPI = API => {
  if (API.includes("articles?cat=")) {
    return "articlesTravel";
  }
  if (API.includes("articles/")) {
    return API.includes("relatedPosts") ? "articlesRelated" : "articleDetail";
  }
  return API;
};

const axios = {
  get: API => {
    return new Promise(resolve => {
      const timeout = setTimeout(() => {
        resolve({
          status: 200,
          data: api[checkAPI(API)]
        });
        clearTimeout(timeout);
      }, 0);
    });
  }
};
export default axios;
