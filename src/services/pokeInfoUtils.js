import store from '../store/store';

const getPokemonDetailsFromInfoCards = (pokemonDetailsUrl) => {
  const { pokemonDetailsInfoCards } = store.getState().pokeInfo;
  let pokemonDetails;
  const pokemonDetailsInfoCard = pokemonDetailsInfoCards
    .find((infoCard) => infoCard.detailsUrl === pokemonDetailsUrl);

  if (pokemonDetailsInfoCard) {
    const {
      id, name, avatarUrl, abilities
    } = pokemonDetailsInfoCard;
    pokemonDetails = {
      id, name, avatarUrl, abilities
    };
  }
  return pokemonDetails;
};

export default getPokemonDetailsFromInfoCards;
