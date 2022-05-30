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
import {Provider} from 'react-redux';
import {persistor, store} from './/data/store';
import {PersistGate} from 'redux-persist/integration/react';
import App from './App';

const AppContainer = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} />
      <App />
    </Provider>
  );
};

export default AppContainer;
