import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);

const galleryItemsEl = document.querySelector('.gallery');

const markup = galleryItems
  .map(
    ({ preview, original, description }) => `<li><a class="gallery__item" href=${original}>
  <img class="gallery__image"
  src=${preview}
  alt=${description} />
</a></li>`,
  )
  .join('');

galleryItemsEl.innerHTML = markup;

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});