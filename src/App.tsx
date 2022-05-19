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
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';

import {TopBar, Owed, Dates, PayButton} from './components/Home';
import {getColors} from './styles/colors';
import {Provider} from 'react-redux';
import {persistor, store} from './/data/store';
import {PayDialog} from './components/PayDialog';
import {PersistGate} from 'redux-persist/integration/react';
import {PaymentHistory} from './components/PaymentHistory';

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
    },
    contentContainer: {
      flex: 1,
    },
    footer: {
      height: 100,
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
  });
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const styles = getStyles(isDarkMode);
  const [showPayDialog, setShowPayDialog] = useState(false);
  const [showPaymentHistory, setShowPaymentHistory] = useState(false);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={styles.background}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <View style={styles.container}>
            <TopBar />
            <View style={styles.contentContainer}>
              <Owed />
              <Dates />
              <Button
                title="View Payment History"
                onPress={() => setShowPaymentHistory(true)}
              />
            </View>
            <View style={styles.footer}>
              <PayButton setShowPayDialog={setShowPayDialog} />
            </View>
          </View>
        </SafeAreaView>
        <PayDialog
          setShowPayDialog={setShowPayDialog}
          showPayDialog={showPayDialog}
        />
        <PaymentHistory
          setShowPaymentHistory={setShowPaymentHistory}
          showPaymentHistory={showPaymentHistory}
        />
      </PersistGate>
    </Provider>
  );
};

export default App;
