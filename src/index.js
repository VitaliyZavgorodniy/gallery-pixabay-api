import "./css/normalize.css";
import "./css/styles.css";

import debounce from "lodash.debounce";
import { Notify } from "notiflix/build/notiflix-notify-aio";

import { fetchPhotos } from "./js/fetchPhotos";
import { renderPhotos } from "./js/renderPhotos";

const inputSearch = document.querySelector("[name='searchQuery']");
const fetchData = {
  value: null,
  hits: [],
  totalHits: 0,
  page: 1,
};

const handleSearch = (e) => {
  const { value } = e.target;
  fetchData.page = 1;

  fetchPhotos(value, 1)
    .then((data) => {
      if (data.hits.length) {
        Notify.success(`Hooray! We found ${data.totalHits} images.`);

        fetchData.value = value;
        fetchData.totalHits = data.totalHits;
        fetchData.hits = data.hits;
        renderPhotos(fetchData.hits);
      } else
        Notify.failure(
          "Sorry, there are no images matching your search query. Please try again."
        );
    })
    .catch((e) => console.error(e));
};

window.onscroll = () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight &&
    fetchData.hits.length < fetchData.totalHits
  ) {
    fetchData.page++;

    fetchPhotos(fetchData.value, fetchData.page)
      .then((data) => {
        if (data.hits.length) {
          fetchData.hits = fetchData.hits.concat(data.hits);

          renderPhotos(fetchData.hits);
        }
      })
      .catch((e) => console.error(e));
  }
};

inputSearch.addEventListener("input", debounce(handleSearch, 500));
