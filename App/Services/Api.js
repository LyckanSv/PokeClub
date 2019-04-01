import apisauce from "apisauce";

const create = (baseURL = "https://pokeapi.co/api/v2") => {
  const api = apisauce.create({
    baseURL,
    timeout: 15000
  });

  const getRegions = () => {
    return api.get("/region");
  };

  const getPokedex = region => {
    return api.get(`/pokedex/${region}/`);
  };

  const getPokemonDetail = id => {
    return api.get(`/pokemon/${id}/`);
  };

  const getPokemonSpecies = id => {
    return api.get(`/pokemon-species/${id}/`);
  };

  return {
    getRegions,
    getPokedex,
    getPokemonDetail,
    getPokemonSpecies
  };
};

export default {
  create
};
