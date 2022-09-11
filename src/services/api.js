import axios from 'axios';
import { toast } from 'react-toastify';

export const fetchPhotos = async (query, page) => {
  try {
    axios.defaults.baseURL = `https://pixabay.com/api/`;
    const API_KEY = '29702689-0ddf3ae605917d12f22a62166';
    const searchParams = new URLSearchParams({
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: 12,
    });
    const response = await axios.get(`/?${searchParams}`);
    const responseTotalHits = response.data.totalHits;

    if (responseTotalHits === 0) {
      toast.error(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    if (responseTotalHits <= 12) {
      toast.info(
        `Sorry, there are only ${responseTotalHits} images for your search`
      );
    }
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
