import { BASE_URL } from '../constants/pokeInfoElements';

const getPageRequest = (pageNumber, pageLimit) => fetch(
  `${BASE_URL}pokemon?limit=${pageLimit}&offset=${pageNumber * pageLimit - pageLimit}`
);

const getPokemonDetailsRequest = (detailsUrl) => fetch(detailsUrl);

const pokeInfoApi = {
  getPageRequest,
  getPokemonDetailsRequest,
};

export default pokeInfoApi;
