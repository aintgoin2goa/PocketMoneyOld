import React from 'react';
import {Pressable, StyleSheet, Text, useColorScheme, View} from 'react-native';
import {getColors} from '../../styles/colors';
import {TITLE_FONT} from '../../styles/typography';

const getStyles = (isDarkMode: boolean) => {
  const colors = getColors(isDarkMode);
  return StyleSheet.create({
    container: {
      //   marginTop: 'auto',
    },
    button: {
      backgroundColor: colors.highlight,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 10,
      marginRight: 10,
    },
    buttonText: {
      fontFamily: TITLE_FONT,
      color: colors.background,
      fontSize: 30,
    },
  });
};

export const PayButton: React.FC = () => {
  const styles = getStyles(useColorScheme() === 'dark');
  return (
    <View style={styles.container}>
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Pay</Text>
      </Pressable>
    </View>
  );
};
