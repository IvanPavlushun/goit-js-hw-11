import { fetchImages } from "./js/pixabay-api";
import { renderImages } from "./js/render-functions";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector("#search-form");
const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");

const lightbox = new SimpleLightbox(".gallery a");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const query = event.target.elements.searchQuery.value.trim(); 

  if (!query) {
    iziToast.warning({
      title: "Warning",
      message: "Please enter a search term!",
      position: "topRight",
    });
    return;
  }

  loader.style.display = "block"; 
  gallery.innerHTML = ""; 

  try {
    const images = await fetchImages(query); 

    loader.style.display = "none"; 

    if (images.length === 0) {
      iziToast.error({
        title: "Error",
        message: "Sorry, there are no images matching your search query!",
        position: "topRight",
      });
      return;
    }

    gallery.innerHTML = renderImages(images); 
    lightbox.refresh(); 
  } catch (error) {
    loader.style.display = "none"; 
    iziToast.error({
      title: "Error",
      message: "An error occurred while fetching images!",
      position: "topRight",
    });
  }
});
