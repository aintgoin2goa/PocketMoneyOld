import React, {useState} from 'react';
import {Button, StyleSheet, useColorScheme, View} from 'react-native';
import {TopBar, Owed} from '.';
import {PrimaryActionButton} from '../shared/PrimaryActionButton';
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
      padding: 10,
    },
  });
};

export type HomeProps = NativeStackScreenProps<StackList, 'Home'>;

export const Home: React.FC<HomeProps> = ({navigation}) => {
  const styles = getStyles(useColorScheme() === 'dark');
  const [showPayDialog, setShowPayDialog] = useState(false);

  return (
    <View style={styles.container}>
      <TopBar navigation={navigation} />
      <View style={styles.contentContainer}>
        <Owed />
        <Dates />
        <Button
          title="View Payment History"
          onPress={() => navigation.navigate('Payment History')}
        />
      </View>
      <View style={styles.footer}>
        <PrimaryActionButton
          text="Pay"
          onPress={() => setShowPayDialog(true)}
        />
      </View>
      <PayDialog
        setShowPayDialog={setShowPayDialog}
        showPayDialog={showPayDialog}
      />
    </View>
  );
};
