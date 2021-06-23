import React from 'react';
import { Spinner } from 'native-base';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import useCachedResources from './src/hooks/useCachedResources';
import GlobalStyles from './src/styles/GlobalStyles';
import logo from './assets/logo.png';
import PokemonList from './src/screens/PokemonList';
import PokemonView from './src/screens/PokemonView';

const Stack = createStackNavigator();

const App = () => {
  const { isLoadingComplete } = useCachedResources();

  if (!isLoadingComplete) return <Spinner color="red" />;

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="PokemonList"
        screenOptions={{
          headerTitle: () => <Image source={logo} style={GlobalStyles.navbarImage} />,
          headerStyle: GlobalStyles.navbar,
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen name="PokemonList" component={PokemonList} options={{ title: 'Pokemon List' }} />
        <Stack.Screen name="PokemonView" component={PokemonView} options={{ title: 'Pokemon View' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
