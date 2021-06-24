import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * usePokemon
 * @param {number|undefined} id Pokemon Id
 * @returns {Object}
 */
const usePokemon = (id) => {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonData, setPokemonData] = useState({});
  const [isPokemonsLoading, setIsPokemonsLoading] = useState(false);
  const [isInitialPokemonsListLoaded, setIsInitialPokemonsListLoaded] = useState(false);
  const [nextPage, setNextPage] = useState(null);

  const handleAllPokemonList = (pokemonList) => {
    Promise.all(pokemonList.map((item) => axios.get(item.url)))
      .then((responses) => {
        const updated = [...pokemons];
        responses.forEach((response) => {
          updated.push(response.data);
        });
        setIsPokemonsLoading(false);
        setIsInitialPokemonsListLoaded(true);
        setPokemons(updated);
      })
      .catch(() => {
        setIsPokemonsLoading(false);
      });
  };

  /**
   * getPokemons
   * @returns {void}
   */
  const getPokemons = () => {
    setIsPokemonsLoading(true);
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=50')
      .then((response) => {
        handleAllPokemonList(response.data.results);
        setNextPage(response.data?.next ? response.data.next : null);
      })
      .catch(() => {
        setIsPokemonsLoading(false);
      });
  };

  /**
   * getPokemonSpecies
   * @returns {void}
   */
  const getPokemonSpecies = () => {
    setIsPokemonsLoading(true);
    axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
      .then((response) => {
        setPokemonData(response.data);
      })
      .catch(() => {
        setIsPokemonsLoading(false);
      });
  };

  /**
 * getMorePokemons
 * @returns {void}
 */
  const getMorePokemons = () => {
    setIsPokemonsLoading(true);
    axios.get(nextPage)
      .then((response) => {
        handleAllPokemonList(response.data.results);
        setNextPage(response.data?.next ? response.data.next : null);
      })
      .catch(() => {
        setIsPokemonsLoading(false);
      });
  };

  useEffect(() => {
    if (!id) {
      getPokemons();
    } else {
      getPokemonSpecies();
    }
  }, [id]);

  return {
    pokemons,
    isPokemonsLoading,
    nextPage,
    isInitialPokemonsListLoaded,
    getMorePokemons,
    pokemonData,
  };
};

export default usePokemon;
