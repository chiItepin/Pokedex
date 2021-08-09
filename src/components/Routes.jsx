import React from 'react';
import {
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import PropTypes from 'prop-types';
import PokemonList from '../screens/PokemonList';
import PokemonBerries from '../screens/PokemonBerries';
import PokemonView from '../screens/PokemonView';
import GlobalStyles from '../styles/GlobalStyles';
import logo from '../../assets/logo.png';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

/**
 * stackOptions
 * @param {Object} navigation
 * @param {Object} route
 * @returns {Object}
 */
const stackOptions = (navigation, route) => ({
  headerTitle: () => <Image source={logo} style={GlobalStyles.navbarImage} />,
  headerStyle: GlobalStyles.navbar,
  headerTintColor: '#fff',
  headerTitleAlign: 'center',
  headerLeft: (props) => (!route?.state?.index
    ? (
      <NavigationDrawerStructure navigationProps={navigation} />
    ) : (
      <HeaderBackButton
        {...props}
      />
    )),
});

const NavigationDrawerStructure = ({ navigationProps }) => {
  // Structure for the navigatin Drawer
  const toggleDrawer = () => {
    // Props to open/close the drawer
    navigationProps.toggleDrawer();
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={toggleDrawer}>
        <Image
          source={{
            uri:
              'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png',
          }}
          style={{ width: 25, height: 25, marginLeft: 15 }}
        />
      </TouchableOpacity>
    </View>
  );
};

NavigationDrawerStructure.propTypes = {
  navigationProps: PropTypes.object.isRequired,
};

/**
 * PokemonStack - handles Pokemon views/routes
 * @component
 */
const PokemonStack = ({ navigation, route }) => (
  <Stack.Navigator
    initialRouteName="PokemonList"
    screenOptions={stackOptions(navigation, route)}
  >
    <Stack.Screen name="PokemonList" component={PokemonList} options={{ title: 'Pokemons' }} />
    <Stack.Screen name="PokemonView" component={PokemonView} options={{ title: 'Pokemon View' }} />
  </Stack.Navigator>
);

PokemonStack.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

/**
 * PokemonStack - handles Pokemon views/routes
 * @component
 */
const PokemonBerriesStack = ({ navigation, route }) => (
  <Stack.Navigator
    initialRouteName="PokemonBerries"
    screenOptions={stackOptions(navigation, route)}
  >
    <Stack.Screen name="PokemonBerries" component={PokemonBerries} options={{ title: 'Berries' }} />
  </Stack.Navigator>
);

PokemonBerriesStack.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

const Navigation = () => (
  <Drawer.Navigator
    initialRouteName="PokemonStack"
  >
    <Drawer.Screen name="PokemonStack" component={PokemonStack} options={{ drawerLabel: 'Pokemons' }} />
    <Drawer.Screen name="PokemonBerriesStack" component={PokemonBerriesStack} options={{ drawerLabel: 'Berries' }} />
  </Drawer.Navigator>
);

export default Navigation;
