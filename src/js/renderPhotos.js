import { Notify } from "notiflix/build/notiflix-notify-aio";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryBox = document.querySelector(".gallery");
const galleryLigthbox = new SimpleLightbox(".gallery a", {
  captionDelay: 250,
});

export const renderPhotos = async (data) => {
  const elementHTML = data
    .map(
      ({
        previewURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
              <a class="photo-card" href="${largeImageURL}">
                <img src="${previewURL}" alt="${tags}" title="${tags}" loading="lazy" />
                <div class="info">
                  <p class="info-item">
                    <b>Likes</b>
                    ${likes}
                  </p>
                  <p class="info-item">
                    <b>Views</b>
                    ${views}
                  </p>
                  <p class="info-item">
                    <b>Comments</b>
                    ${comments}
                  </p>
                  <p class="info-item">
                    <b>Downloads</b>
                    ${downloads}
                  </p>
                </div>
              </a>
              `
    )
    .join("");

  galleryBox.innerHTML = elementHTML;

  galleryLigthbox.refresh();
};
