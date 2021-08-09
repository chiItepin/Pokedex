import React from 'react';
import { Spinner } from 'native-base';
import {
  Alert,
} from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import useCachedResources from './src/hooks/useCachedResources';
import AppReducer from './src/reducer';
import Navigation from './src/components/Routes';

const store = createStore(AppReducer);

const App = () => {
  const { isLoadingComplete = true } = useCachedResources();

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
        <Navigation />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
