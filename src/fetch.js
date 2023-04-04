import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/?';

export function fetchPictures(text, page) {
  const parameters = new URLSearchParams ({
    key: '34901171-040724bc8757a494d43e7296f',
    q: text,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 40, 
  });
  return axios.get(`${BASE_URL}${parameters}`);
}
