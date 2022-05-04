/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';

import {TopBar, Owed, Dates, PayButton} from './javascript/components/Home';
import {getColors} from './javascript/styles/colors';
import {Provider} from 'react-redux';
import {store} from './javascript/data/store';

const getStyles = (isDarkMode: boolean) => {
  const colors = getColors(isDarkMode);
  return StyleSheet.create({
    background: {
      backgroundColor: colors.background,
      flex: 1,
    },
    container: {
      flex: 1,
      flexGrow: 1,
      justifyContent: 'space-between',
      // backgroundColor: '#85735d', // GOLD
    },
    contentContainer: {
      flex: 1,
      // backgroundColor: '#c938b8', // PINK
    },
    footer: {
      height: 100,
      // backgroundColor: '#2a4099', //BLUE
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
  });
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const styles = getStyles(isDarkMode);
  const [showPayDialog, setShowPayDialog] = useState(false);
  const toggleShowPayDialog = () => {
    setShowPayDialog(!showPayDialog);
  };

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.background}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <View style={styles.container}>
          <TopBar />
          <View style={styles.contentContainer}>
            <Owed />
            <Dates />
          </View>
          <View style={styles.footer}>
            <PayButton toggleShowPayDialog={toggleShowPayDialog} />
          </View>
        </View>
      </SafeAreaView>
    </Provider>
  );
};

export default App;
