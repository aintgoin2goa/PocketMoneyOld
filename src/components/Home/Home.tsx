import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Button, StyleSheet, useColorScheme, View} from 'react-native';
import {TopBar, Owed, PayButton} from '.';
import {getColors} from '../../styles/colors';
import {PayDialog} from './PayDialog';
import {Dates} from './Dates';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackList} from '../../types';

const getStyles = (isDarkMode: boolean) => {
  return StyleSheet.create({
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

export type HomeProps = NativeStackScreenProps<StackList, 'Home'>;

export const Home: React.FC<HomeProps> = ({navigation}) => {
  const styles = getStyles(useColorScheme() === 'dark');
  const [showPayDialog, setShowPayDialog] = useState(false);

  return (
    <View style={styles.container}>
      <TopBar />
      <View style={styles.contentContainer}>
        <Owed />
        <Dates />
        <Button
          title="View Payment History"
          onPress={() => navigation.navigate('Payment History')}
        />
      </View>
      <View style={styles.footer}>
        <PayButton setShowPayDialog={setShowPayDialog} />
      </View>
      <PayDialog
        setShowPayDialog={setShowPayDialog}
        showPayDialog={showPayDialog}
      />
    </View>
  );
};
