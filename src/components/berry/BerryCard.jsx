import React from 'react';
import {
  Text,
  Card,
  CardItem,
  Body,
  Badge,
  H3,
} from 'native-base';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Divider from '../ui/Divider';
import GlobalStyles from '../../styles/GlobalStyles';

const BerryCard = ({
  berry,
}) => (
  <View style={GlobalStyles.berryCard}>
    <Card style={GlobalStyles.card}>
      <CardItem>
        <Body>
          <H3 style={GlobalStyles.cardText}>
            {berry.item.name.toUpperCase()}
          </H3>

          <Divider text={`${berry.item.natural_gift_type.name}: ${berry.item.natural_gift_power}`} />

          <View style={GlobalStyles.berryFlavorContainer}>
            {
              berry.item.flavors.map((flavor) => (
                <View key={flavor.flavor.name} style={GlobalStyles.berryFlavorItem}>
                  <Text>
                    {flavor.flavor.name}
                  </Text>
                  <Badge
                    info={flavor.potency <= 10 && true}
                    success={flavor.potency >= 11 && true}
                  >
                    <Text>{flavor.potency}</Text>
                  </Badge>
                </View>
              ))
            }
          </View>
        </Body>
      </CardItem>
    </Card>
  </View>
);

BerryCard.propTypes = {
  berry: PropTypes.object.isRequired,
};

const arePropsEqual = (prevProps, nextProps) => (prevProps?.item?.id === nextProps?.item?.id);

export default React.memo(BerryCard, arePropsEqual);
