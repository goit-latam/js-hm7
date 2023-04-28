import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const galleryContainer = document.querySelector(".gallery");

const createGalleryItem = createGalleryMakeup(galleryItems);

galleryContainer.addEventListener("click", onOpenModalClick);

function createGalleryMakeup(gallery) {
  return gallery
    .map(
      ({ preview, original, description }) =>
        `<div class="gallery__item">
      <a class="gallery__link" href=${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </div>`
    )
    .join("");
}

galleryContainer.insertAdjacentHTML("beforeend", createGalleryItem);
//const createGalleryItem = galleryItems
//.map(
//  ({ preview, original, description }) =>
//    `<div class="gallery__item">
//   <a class="gallery__link" href="large-image.jpg">
//     <img
//       class="gallery__image"
//       src="${preview}"
//       data-source="${original}"
//       alt="${description}"
//     />
//   </a>
// </div>`
//)
//.join("");

//galleryContainer.insertAdjacentHTML("beforeend", createGalleryItem);

function onOpenModalClick(event) {
  event.preventDefault();
  console.log(event.target);

  if (event.target.nodeName !== "IMG") {
    return;
  }

  const instance = basicLightbox.create(`
    <div class="modal">
        <img src= "${event.target.dataset.source}"/>
    </div>
`);

  instance.show();
  window.addEventListener("keydown", onCloseModalClick);
  instance.element().addEventListener("click", onCloseModalClick);

  function onCloseModalClick(event) {
    if (event.code === "Escape" || event.target.nodeName === "IMG") {
      instance.close();

      window.removeEventListener("keydown", onCloseModalClick);
    }
  }
}
