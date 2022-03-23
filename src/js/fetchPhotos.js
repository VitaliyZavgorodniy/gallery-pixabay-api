import axios from "axios";

const API_KEY = "18651709-2ed9926c287754060d45cde83";
const API_URL = "https://pixabay.com/api/";

const options = {
  per_page: 40,
  image_type: "photo",
  orientation: "horizontal",
  safesearch: true,
};

export const fetchPhotos = (value, page = 1) =>
  axios
    .get(API_URL, {
      params: {
        key: API_KEY,
        q: value,
        page: page,
        ...options,
      },
    })
    .catch((e) => console.error(e));
