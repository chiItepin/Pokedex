import React, { useState, useEffect } from 'react';
import { FlatList, View, Text } from 'react-native';
import {
  Spinner,
} from 'native-base';
import usePokemons from '../hooks/pokemon/usePokemons';
import BerryCard from '../components/berry/BerryCard';
import SearchField from '../components/ui/SearchField';

const PokemonBerries = () => {
  const [searchValue, setSearchValue] = useState('');
  const [listOfPokemonBerries, setListOfPokemonBerries] = useState([]);

  const {
    getAllPokemonBerries,
    pokemonBerries,
    isPokemonBerriesLoading,
  } = usePokemons();
  /**
   * handleSearchSubmit
   * @param {Object} event
   */
  const handleSearchSubmit = (event) => {
    const updatedList = pokemonBerries
      .filter((berry) => berry.item.name.includes(event.nativeEvent.text.toLowerCase()));
    setListOfPokemonBerries(updatedList);
  };

  const clearSearchField = () => {
    setSearchValue('');
    setListOfPokemonBerries(pokemonBerries);
  };

  /**
   * renderListFooter it conditinally renders the list footer
   * depending on search value or pokemonslist state
   * @returns {React.ReactChild|undefined}
   */
  const renderListFooter = () => {
    if (isPokemonBerriesLoading) {
      return <Spinner color="red" />;
    }

    if (searchValue) return undefined;
    return undefined;
  };

  useEffect(() => {
    setListOfPokemonBerries(pokemonBerries);
  }, [pokemonBerries]);

  useEffect(() => {
    getAllPokemonBerries();
  }, []);

  return (
    <View>
      {isPokemonBerriesLoading && <Spinner color="red" />}

      {
        (!isPokemonBerriesLoading) && (
          <>
            <FlatList
              data={listOfPokemonBerries}
              renderItem={(berry) => <BerryCard berry={berry} />}
              keyExtractor={(berry) => berry?.id.toString()}
              ListEmptyComponent={!isPokemonBerriesLoading && <Text style={{ textAlign: 'center' }}>Berry not found</Text>}
              ListHeaderComponent={(
                <SearchField
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                  handleSearchSubmit={handleSearchSubmit}
                  clearSearchField={clearSearchField}
                />
              )}
              ListFooterComponent={renderListFooter()}
            />
          </>
        )
      }
    </View>
  );
};

export default PokemonBerries;
