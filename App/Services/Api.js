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

  return {
    getRegions,
    getPokedex
  };
};

export default {
  create
};
