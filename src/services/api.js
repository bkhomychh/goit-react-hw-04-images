import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '33338208-11c51ab24b54d8aa6d7b9aafa';

const getImagesBySearchQuery = async (searchQuery, page) => {
  const options = {
    params: {
      key: API_KEY,
      q: searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      page: page,
      per_page: 12,
    },
  };
  const response = await axios.get(BASE_URL, options);

  if (response.data.hits.length < 1) {
    return Promise.reject(
      new Error(`Oops, there are no images for ${searchQuery} 🤨`)
    );
  }
  return response.data.hits;
};

export { getImagesBySearchQuery };
