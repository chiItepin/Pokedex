import React from 'react';
import {
  Image,
  View,
  Text,
  ScrollView,
} from 'react-native';
import {
  Card,
} from 'native-base';
import PropTypes from 'prop-types';
import { Col, Row, Grid } from 'react-native-easy-grid';
import usePokemons from '../hooks/pokemon/usePokemons';
import GlobalStyles from '../styles/GlobalStyles';
import Divider from '../components/ui/Divider';
import PokemonStat from '../components/ui/PokemonStat';

const PokemonView = ({
  route,
}) => {
  const { pokemonData } = usePokemons(route?.params?.pokemon?.id ? route.params.pokemon.id : '');

  /**
   * getPokemonDescription
   * @returns {Object}
   */
  const getPokemonDescription = () => {
    if (pokemonData?.flavor_text_entries) {
      const [description = {}] = pokemonData.flavor_text_entries.filter((item) => item.language.name === 'en');
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

  return (
    <ScrollView>
      <View style={GlobalStyles.mainCardView}>
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
                  <Text style={GlobalStyles.measureTitle}>Height:</Text>
                  <Text style={GlobalStyles.pokemonId}>
                    {`${route.params.pokemon.height}m`}
                  </Text>
                </View>

                <View style={GlobalStyles.measureCol}>
                  <Text style={GlobalStyles.measureTitle}>Weight:</Text>
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

                <Divider text="Statistics" />
                {
                  route.params.pokemon.stats.map((stat) => (
                    <PokemonStat
                      key={stat.stat.name}
                      stat={stat.stat.name.toUpperCase()}
                      statValue={stat.base_stat}
                      width={`${getStatBarWidth(stat.base_stat)}%`}
                    />
                  ))
                }
              </View>
            </Row>
          </Grid>
        </Card>
      </View>
    </ScrollView>
  );
};

PokemonView.propTypes = {
  route: PropTypes.object.isRequired,
};

export default PokemonView;
