import React, { useState, useEffect } from 'react';
import {
  Image,
  View,
  Text,
  ScrollView,
} from 'react-native';
import {
  Card,
  Spinner,
} from 'native-base';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { connect } from 'react-redux';
import usePokemons from '../hooks/pokemon/usePokemons';
import GlobalStyles from '../styles/GlobalStyles';
import Divider from '../components/ui/Divider';
import PokemonStat from '../components/pokemon/PokemonStat';

const PokemonView = ({
  route,
  deviceLang,
  translations,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [pokemonStats, setPokemonStats] = useState([]);
  const { pokemonData } = usePokemons(route?.params?.pokemon?.id ? route.params.pokemon.id : '');

  /**
   * getStatByName
   * @param {string} name
   * @returns {Object}
   */
  const getStatByName = (name) => {
    const [selectedStat] = pokemonStats.filter((stat) => stat.stat.name === name);
    return selectedStat;
  };

  /**
   * handlePokemonStats
   * @returns {void}
   */
  const handlePokemonStats = () => {
    Promise.all(route.params.pokemon.stats.map((stat) => axios.get(stat.stat.url)))
      .then((responses) => {
        const updated = route.params.pokemon.stats;
        responses.forEach((response, index) => {
          const [statLocale = {}] = response.data.names
            .filter((item) => item.language.name === deviceLang);
          updated[index].statLocale = statLocale;
        });
        setPokemonStats(updated);
        setLoaded(true);
      })
      .catch(() => {
        setLoaded(false);
      });
  };

  /**
   * getPokemonDescription
   * @returns {Object}
   */
  const getPokemonDescription = () => {
    if (pokemonData?.flavor_text_entries) {
      const [description = {}] = pokemonData.flavor_text_entries
        .filter((item) => item.language.name === deviceLang);
      return description;
    }
    return {};
  };

  /**
   * getStatBarWidth - it calculates the width in percentage based on the highest stat value
   * @param {number} value
   * @returns {string}
   */
  const getStatBarWidth = (value) => {
    if (route?.params?.pokemon?.stats) {
      const statValues = route.params.pokemon.stats.map((stat) => stat.base_stat);
      const highestValue = Math.max(...statValues);
      const percentage = (value * 100) / highestValue;
      return percentage.toString();
    }
    return '';
  };

  useEffect(() => {
    if (route?.params?.pokemon?.stats) {
      handlePokemonStats();
    }
  }, [route?.params?.pokemon?.stats]);

  return (
    <ScrollView>
      <View style={GlobalStyles.mainCardView}>
        {
          !loaded && <Spinner color="red" />
        }

        {
          loaded && (
            <Card style={GlobalStyles.card}>
              <Grid style={GlobalStyles.grid}>
                <Row size={20} style={GlobalStyles.row}>
                  <Col>
                    <Image
                      source={{ uri: route.params.pokemon.sprites.front_default }}
                      style={GlobalStyles.cardMainImage}
                    />
                  </Col>

                  <Col>
                    <Text style={GlobalStyles.pokemonId}>
                      {`#${(`000${route.params.pokemon.id}`).slice(-4)}`}
                    </Text>
                    <Text style={GlobalStyles.pokemonTitle}>
                      {route.params.pokemon.name}
                    </Text>

                    <View style={GlobalStyles.measureCol}>
                      <Text style={GlobalStyles.measureTitle}>
                        {`${translations?.[deviceLang]?.height ? translations[deviceLang].height : 'Height'}:`}
                      </Text>
                      <Text style={GlobalStyles.pokemonId}>
                        {`${route.params.pokemon.height}m`}
                      </Text>
                    </View>

                    <View style={GlobalStyles.measureCol}>
                      <Text style={GlobalStyles.measureTitle}>
                        {`${translations?.[deviceLang]?.weight ? translations[deviceLang].weight : 'Weight'}:`}
                      </Text>
                      <Text style={GlobalStyles.pokemonId}>
                        {`${route.params.pokemon.weight}kg`}
                      </Text>
                    </View>
                  </Col>
                </Row>
                <Row size={80} style={GlobalStyles.row}>
                  <View style={GlobalStyles.row}>
                    {
                      getPokemonDescription()?.flavor_text && (
                        <Text style={GlobalStyles.pokemonDescription}>
                          {getPokemonDescription().flavor_text.replace(/(\r\n|\n|\r)/gm, ' ')}
                        </Text>
                      )
                    }

                    <Divider text={translations?.[deviceLang]?.statistics ? translations[deviceLang].statistics : 'Statistics'} />
                    {
                      route.params.pokemon.stats.map((stat) => (
                        <PokemonStat
                          key={stat.stat.name}
                          stat={getStatByName(stat.stat.name).statLocale.name.toUpperCase()}
                          statValue={stat.base_stat}
                          width={`${getStatBarWidth(stat.base_stat)}%`}
                        />
                      ))
                    }
                  </View>
                </Row>
              </Grid>
            </Card>
          )
        }
      </View>
    </ScrollView>
  );
};

PokemonView.propTypes = {
  route: PropTypes.object.isRequired,
  deviceLang: PropTypes.string.isRequired,
  translations: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  deviceLang: state.deviceLang,
  translations: state.translations,
});

export default connect(mapStateToProps)(PokemonView);
