import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Col, Grid } from 'react-native-easy-grid';
import { LinearGradient } from 'expo-linear-gradient';
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
        <LinearGradient
          start={[0, 1]}
          end={[1, 0]}
          colors={['rgb(123, 87, 208)', 'rgb(149, 175, 239)']}
          style={[GlobalStyles.sideStatsBarFilled, { width }]}
        >
          <View style={GlobalStyles.sideStatsBarTooltip}>
            <Text style={GlobalStyles.sideStatsBarTooltipText}>{statValue}</Text>
          </View>
        </LinearGradient>
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
