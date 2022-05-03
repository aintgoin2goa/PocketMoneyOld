import React from 'react';
import {View, Text, StyleSheet, useColorScheme} from 'react-native';
import {getColors} from '../../styles/colors';
import {BASE_FONT, TITLE_FONT} from '../../styles/typography';

const getStyles = (isDarkMode: boolean) => {
  const colors = getColors(isDarkMode);
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    innerContainer: {
      marginTop: 50,
      // flex: 1,
    },
    title: {
      height: 40,
      fontFamily: TITLE_FONT,
      fontSize: 30,
      backgroundColor: colors.text,
      color: colors.background,
      paddingHorizontal: 10,
    },
    amount: {
      fontFamily: BASE_FONT,
      fontSize: 30,
      color: colors.text,
      paddingHorizontal: 10,
    },
  });
};

export const Dates: React.FC = () => {
  const styles = getStyles(useColorScheme() === 'dark');
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Next due</Text>
        <Text style={styles.amount}>in 3 days</Text>
      </View>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Last paid</Text>
        <Text style={styles.amount}>1 week ago</Text>
      </View>
    </View>
  );
};
