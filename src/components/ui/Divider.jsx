import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

const Divider = ({
  text,
}) => (
  <View
    style={{
      borderBottomWidth: 1,
      width: '100%',
      textAlign: 'center',
      marginVertical: 30,
      borderColor: '#c7c7c7',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text style={{
      position: 'absolute',
      backgroundColor: '#fff',
      margin: 'auto',
      marginTop: -10,
      width: 100,
      color: '#c7c7c7',
      paddingHorizontal: 8,
      textAlign: 'center',
    }}
    >
      {text.toUpperCase()}
    </Text>
  </View>
);

Divider.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Divider;
