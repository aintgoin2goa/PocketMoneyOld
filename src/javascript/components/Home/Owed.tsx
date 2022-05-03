import React from 'react';
import {StyleSheet, Text, useColorScheme, View} from 'react-native';
import {getColors} from '../../styles/colors';
import {BASE_FONT, TITLE_FONT} from '../../styles/typography';

const getStyles = (isDarkMode: boolean) => {
  const colors = getColors(isDarkMode);
  return StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 50,
    },
    label: {
      fontFamily: BASE_FONT,
      fontSize: 30,
      color: colors.text,
    },
    amount: {
      fontFamily: TITLE_FONT,
      fontSize: 120,
      color: colors.highlight,
    },
  });
};

export const Owed: React.FC = () => {
  const styles = getStyles(useColorScheme() === 'dark');
  return (
    <View style={styles.container}>
      <Text style={styles.label}>You owe</Text>
      <Text style={styles.amount}>£3.50</Text>
    </View>
  );
};
