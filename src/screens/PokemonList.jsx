import React, { useState, useEffect } from 'react';
import { FlatList, View, Text } from 'react-native';
import {
  Spinner,
  Button,
} from 'native-base';
import PropTypes from 'prop-types';
import usePokemons from '../hooks/pokemon/usePokemons';
import PokemonCard from '../components/pokemon/PokemonCard';
import SearchField from '../components/ui/SearchField';
import GlobalStyles from '../styles/GlobalStyles';

const PokemonList = ({
  navigation,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);

  const {
    pokemons,
    getMorePokemons,
    nextPage,
    isInitialPokemonsListLoaded,
    isPokemonsLoading,
  } = usePokemons();
  /**
   * handleSearchSubmit
   * @param {Object} event
   */
  const handleSearchSubmit = (event) => {
    setFilteredPokemonList(
      pokemons.filter((pokemon) => pokemon.name
        .toLowerCase()
        .includes(event.nativeEvent.text.toLowerCase())),
    );
  };

  const clearSearchField = () => {
    setSearchValue('');
    setFilteredPokemonList(pokemons);
  };

  /**
   * renderListFooter it conditinally renders the list footer
   * depending on search value or pokemonslist state
   * @returns {React.ReactChild|undefined}
   */
  const renderListFooter = () => {
    if (filteredPokemonList.length && nextPage) {
      if (isPokemonsLoading) {
        return <Spinner color="red" />;
      }

      if (searchValue) return undefined;

      return (
        <Button
          disabled={isPokemonsLoading}
          onPress={() => {
            getMorePokemons();
            setSearchValue('');
          }}
          style={GlobalStyles.loadMoreBtn}
        >
          <Text style={GlobalStyles.loadMoreBtnText}>Load more</Text>
        </Button>
      );
    }

    return undefined;
  };

  useEffect(() => {
    setFilteredPokemonList(pokemons);
  }, [pokemons]);

  return (
    <View>
      {!isInitialPokemonsListLoaded && <Spinner color="red" />}

      {
        isInitialPokemonsListLoaded && (
          <>
            <FlatList
              data={filteredPokemonList}
              renderItem={(pokemon) => <PokemonCard pokemon={pokemon} navigation={navigation} />}
              keyExtractor={(pokemon) => pokemon.id.toString()}
              numColumns={3}
              columnWrapperStyle={GlobalStyles.contentColumnWrapper}
              ListEmptyComponent={<Text style={{ textAlign: 'center' }}>Pokemon not found or has not been loaded</Text>}
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

PokemonList.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default PokemonList;
