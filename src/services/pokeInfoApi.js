import { BASE_URL } from '../constants/pokeInfoElements';

const getPageRequest = async (pageNumber, pageLimit) => {
  const response = await fetch(`${BASE_URL}pokemon?limit=${pageLimit}&offset=${pageNumber * pageLimit - pageLimit}`);
  return response;
};

const getPokemonDetailsRequest = async (detailsUrl) => {
  const response = await fetch(detailsUrl);
  return response;
};

const pokeInfoApi = {
  getPageRequest,
  getPokemonDetailsRequest,
};

export default pokeInfoApi;
