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

  /**
   * handleAllPokemonList
   * @param {Array} pokemonList
   * @param {boolean} doesRestart it handles whether list should be restarted or not
   * @returns {void}
   */
  const handleAllPokemonList = (pokemonList, doesRestart = false) => {
    Promise.all(pokemonList.map((item) => axios.get(item.url)))
      .then((responses) => {
        const updated = doesRestart ? [] : [...pokemons];
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
   * @param {boolean} doesRestart
   * @returns {void}
   */
  const getPokemons = (doesRestart = false) => {
    setIsPokemonsLoading(true);
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=50')
      .then((response) => {
        handleAllPokemonList(response.data.results, doesRestart);
        setNextPage(response.data?.next ? response.data.next : null);
      })
      .catch(() => {
        setIsPokemonsLoading(false);
      });
  };

  /**
 * getPokemon
 * @param {string} pokemonId
 * @returns {void}
 */
  const getPokemon = (pokemonId) => {
    setIsPokemonsLoading(true);
    setPokemons([]);
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then((response) => {
        setPokemons([response.data]);
        setIsPokemonsLoading(false);
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

  const restartPokemonList = () => {
    setPokemons([]);
    getPokemons(true);
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
    getPokemon,
    restartPokemonList,
  };
};

export default usePokemon;
