import React from 'react';
import {
  Text,
  Card,
  CardItem,
  Body,
} from 'native-base';
import { Image, View } from 'react-native';
import PropTypes from 'prop-types';
import GlobalStyles from '../../styles/GlobalStyles';

const PokemonCard = ({
  pokemon,
  navigation,
}) => (
  <View style={GlobalStyles.cardView}>
    <Card style={GlobalStyles.card}>
      <CardItem button onPress={() => navigation.navigate('PokemonView', { pokemon: pokemon.item })}>
        <Body>
          <Image
            source={{ uri: pokemon.item.sprites.front_default }}
            style={GlobalStyles.cardImage}
          />
          <Text style={GlobalStyles.cardText}>
            {pokemon.item.name}
          </Text>
        </Body>
      </CardItem>
    </Card>
  </View>
);

PokemonCard.propTypes = {
  pokemon: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

const arePropsEqual = (prevProps, nextProps) => (prevProps.id === nextProps.id);

export default React.memo(PokemonCard, arePropsEqual);
