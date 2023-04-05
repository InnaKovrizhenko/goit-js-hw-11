export function renderPicture (data, gallery) {
    const markup = data.map(el => {
        return `<div class="photo-card">
        <a href="${el.largeImageURL}">
      <img src="${el.webformatURL}" alt="${el.tags}" loading="lazy" width='350' height='250'/>
      </a>
      <div class="info">
        <p class="info-item">
          <b>Likes </b>
          ${el.likes}
        </p>
        <p class="info-item">
          <b>Views </b>
          ${el.views}
        </p>
        <p class="info-item">
          <b>Comments </b>
          ${el.comments}
        </p>
        <p class="info-item">
          <b>Downloads </b>
          ${el.downloads}
        </p>
      </div>
    </div>`
    }).join("");
    gallery.insertAdjacentHTML("beforeend", markup);
}

