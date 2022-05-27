/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import React from 'react';
import {Home} from './components/Home';
import {getColors} from './styles/colors';
import {Provider} from 'react-redux';
import {persistor, store} from './/data/store';
import {PersistGate} from 'redux-persist/integration/react';
import {PaymentHistory} from './components/PaymentHistory';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackList} from './types';
import {EditChild} from './components/EditChild';

const getStyles = (isDarkMode: boolean) => {
  const colors = getColors(isDarkMode);
  return StyleSheet.create({
    background: {
      backgroundColor: colors.background,
      flex: 1,
    },
  });
};

const Stack = createNativeStackNavigator<StackList>();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const styles = getStyles(isDarkMode);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={styles.background}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen
                name="Payment History"
                component={PaymentHistory}
                options={{headerShown: true}}
              />
              <Stack.Screen
                name="Edit Child"
                component={EditChild}
                options={{headerShown: true}}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

export default App;
