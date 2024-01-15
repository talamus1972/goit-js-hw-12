import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

const form = document.querySelector('.form');
const imagesGallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

const BASE_URL = 'https://pixabay.com/api/?';
const API_KEY = '41564235-b9b3b0b401bd21d391a887255';

const searchParamsDefault = {
  key: API_KEY,
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
};

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  close: true,
  enableKeyboard: true,
  docClose: true,
});

const showLoader = state => {
  loader.style.display = state ? 'block' : 'none';
};

form.addEventListener('submit', async event => {
  event.preventDefault();
  showLoader(true);
  searchParamsDefault.q = encodeURIComponent(
    event.target.elements.search.value.trim()
  );
  if (searchParamsDefault.q === '') {
    console.error('Please enter a valid search query.');
    return;
  }
  const searchParams = new URLSearchParams(searchParamsDefault);
  await getImages(searchParams);
  event.currentTarget.reset();
});

const getImages = async params => {
  showLoader(true);
  try {
    const response = await axios.get(BASE_URL + `${params}`);
    const { hits } = response.data;

    imagesGallery.innerHTML = '';
    if (hits.length === 0) {
      iziToast.error({
        position: 'topRight',
        messageColor: '#FFFFFF',
        backgroundColor: '#EF4040',
        titleSize: '8px',
        closeOnEscape: true,
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    } else {
      imagesGallery.innerHTML = hits.reduce(
        (html, image) =>
          html +
          `
                  <li class="gallery-item">
                      <a href=${image.largeImageURL}> 
                          <img class="gallery-img" src=${image.webformatURL} alt=${image.tags}/>
                      </a>
                      <div class="gallery-text-box">
                          <p>Likes: <span class="text-value">${image.likes}</span></p>
                          <p>Views: <span class="text-value">${image.views}</span></p>
                          <p>Comments: <span class="text-value">${image.comments}</span></p>
                          <p>Downloads: <span class="text-value">${image.downloads}</span></p>
                      </div>
                  </li>
              `,
        ''
      );
      lightbox.refresh();
    }
  } catch (error) {
    console.error(error.message);
  } finally {
    showLoader(false);
  }
};
