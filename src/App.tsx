/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';

import {TopBar, Owed, Dates, PayButton} from './javascript/components/Home';
import {getColors} from './javascript/styles/colors';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: getColors(isDarkMode).background,
    flex: 1,
  };

  const styles = StyleSheet.create({
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

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.container}>
        <TopBar />
        <View style={styles.contentContainer}>
          <Owed />
          <Dates />
        </View>
        <View style={styles.footer}>
          <PayButton />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;
