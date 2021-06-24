import React from 'react';
import { Spinner } from 'native-base';
import { Image, Alert } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import useCachedResources from './src/hooks/useCachedResources';
import GlobalStyles from './src/styles/GlobalStyles';
import logo from './assets/logo.png';
import PokemonList from './src/screens/PokemonList';
import PokemonView from './src/screens/PokemonView';
import AppReducer from './src/reducer';

const Stack = createStackNavigator();

const store = createStore(AppReducer);

const App = () => {
  const { isLoadingComplete } = useCachedResources();

  const netInfo = useNetInfo();

  React.useEffect(() => {
    if (netInfo?.isInternetReachable) {
      if (netInfo.isInternetReachable === false) {
        Alert.alert(
          'Alert',
          'Lost internet connection',
        );
      }
    }
  }, [netInfo]);

  if (!isLoadingComplete) return <Spinner color="red" />;

  return (
    <Provider store={store}>
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
    </Provider>
  );
};

export default App;
