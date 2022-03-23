import "./css/normalize.css";
import "./css/styles.css";
import "regenerator-runtime/runtime";

import debounce from "lodash.debounce";
import { Notify } from "notiflix/build/notiflix-notify-aio";

import { fetchPhotos } from "./js/fetchPhotos";
import { renderPhotos } from "./js/renderPhotos";

const inputSearch = document.querySelector("[name='searchQuery']");

const state = {
  query: null,
  hits: [],
  totalHits: 0,
  page: 1,
};

const handleSearch = (e) => {
  state.query = e.target.value.trim();

  if (state.query.length) {
    state.page = 1;
    renderGallery();
  }
};

const handleScroll = () => {
  const { innerHeight, scrollY } = window;
  const { offsetHeight } = document.body;
  const { hits, totalHits } = state;

  if (innerHeight + scrollY >= offsetHeight - 200 && hits.length < totalHits) {
    state.page++;
    renderGallery();
  }
};

const renderGallery = async () => {
  const { query, page } = state;

  await fetchPhotos(query, page)
    .then((res) => {
      const { data } = res;

      if (data.hits.length) {
        if (page === 1) {
          state.totalHits = data.totalHits;
          state.hits = data.hits;

          Notify.success(`Hooray! We found ${data.totalHits} images.`);
        } else state.hits = state.hits.concat(data.hits);

        renderPhotos(state.hits);
      } else
        Notify.failure(
          "Sorry, there are no images matching your search query. Please try again."
        );
    })
    .catch((e) => console.error(e));
};

inputSearch.addEventListener("input", debounce(handleSearch, 500));
document.addEventListener("scroll", handleScroll);
