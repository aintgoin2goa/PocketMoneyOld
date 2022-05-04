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

export type PayButtonProps = {
  toggleShowPayDialog: () => void;
};

export const PayButton: React.FC<PayButtonProps> = ({toggleShowPayDialog}) => {
  const styles = getStyles(useColorScheme() === 'dark');
  const onPress = () => toggleShowPayDialog();
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Pay</Text>
      </Pressable>
    </View>
  );
};
