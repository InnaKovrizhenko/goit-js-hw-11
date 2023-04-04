import Notiflix from 'notiflix';
import { fetchPictures } from './fetch';
import { renderPicture } from './markup';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


// fetchPictures('sea').then(data => {
//     const gallery = document.querySelector(".gallery"); 
//     // console.log(data.data.hits);
//     renderPicture (data.data.hits, gallery);
// });

const form = document.querySelector(".search-form");
const gallery = document.querySelector(".gallery");
const loadMore = document.querySelector('.load-more');
const galleryShow = new SimpleLightbox(".gallery a")

let inputText = " ";
let page = 1;

form.addEventListener('submit', onFormSubmit);


async function onFormSubmit(event) {
    
    event.preventDefault();
    inputText = event.currentTarget.searchQuery.value;
    // console.log(inputText);
    gallery.innerHTML = '';

    if (inputText === "") {
        gallery.innerHTML = '';
        loadMore.classList.add('is-hidden');
        return Notiflix.Notify.failure("Write something, plaese!");
    }

    try {
        const data = await fetchPictures(inputText, page);
        // console.log("IMAGES", data);
        const images = data.data.hits;
        // console.log("ARRAY", images);
        
        if (images.length === 0) {
            gallery.innerHTML = '';
            loadMore.classList.add('is-hidden');
            return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        } else {
            Notiflix.Notify.success(`Hooray! We found ${data.data.totalHits} images.`);
        }
        renderPicture (images, gallery);
        galleryShow.refresh();
        page = 1;
        smoothPageScrolling ();

    if (data.data.totalHits > 40) {
        loadMore.classList.remove('is-hidden');
    }

    } catch (error) {
        console.log(error);
    }
}

loadMore.addEventListener('click', onLoadMore);

async function onLoadMore () {
    page += 1;
    // console.log("PAGE", page);
    // console.log("inputText", inputText);
    const data = await fetchPictures(inputText, page);
    // console.log("IMAGES", data);
    const images = data.data.hits;
    // console.log("ARRAY", images);
    renderPicture (images, gallery);
    galleryShow.refresh();
    smoothPageScrolling ();

    const pages = data.data.totalHits / 40;

    if (page > pages) {
        loadMore.classList.add('is-hidden');
        return Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
    }
}

function smoothPageScrolling () {
    const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();

    window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
    });
}














