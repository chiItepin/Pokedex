import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Col, Grid } from 'react-native-easy-grid';
import GlobalStyles from '../../styles/GlobalStyles';

const PokemonStat = ({
  stat,
  statValue,
  width,
}) => (
  <Grid style={GlobalStyles.gridStatBar}>
    <Col style={GlobalStyles.sideStatHeadlineCol}>
      <Text numberOfLines={1} style={GlobalStyles.pokemonId}>{stat}</Text>
    </Col>
    <Col style={GlobalStyles.sideStatBarCol}>
      <View style={GlobalStyles.sideStatsBar}>
        <View style={[GlobalStyles.sideStatsBarFilled, { width }]}>
          <View style={GlobalStyles.sideStatsBarTooltip}>
            <Text style={GlobalStyles.sideStatsBarTooltipText}>{statValue}</Text>
          </View>
        </View>
      </View>
    </Col>
  </Grid>
);

PokemonStat.propTypes = {
  stat: PropTypes.string.isRequired,
  statValue: PropTypes.number.isRequired,
  width: PropTypes.string.isRequired,
};

export default PokemonStat;
