import axios from "axios";

let searchParam;
const access_key = process.env.REACT_APP_ACCESS_KEY;
const random_photos_url = `https://api.unsplash.com/photos/random?client_id=${access_key}&count=30`;
const search_photos_url = `https://api.unsplash.com/search/photos?client_id=${access_key}&query=${searchParam}&per_page=50`;

export const getImages = async () => {
  try {
    let res = await axios.get(random_photos_url);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const searchImages = async (search) => {
  searchParam = search;
  try {
    let res = await axios.get(search_photos_url);
    return res;
  } catch (error) {
    console.log(error);
  }
};
// XaA-C6nWKzXFStQgxYniZE63Q0Qw3kWDmrXf0CiSAsY
