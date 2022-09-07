import React from 'react';
import {StyleSheet, Text, useColorScheme, View} from 'react-native';
import {getColors} from '../../styles/colors';
import {BASE_FONT, TITLE_FONT} from '../../styles/typography';
import {useAppSelector} from '../../data/store';
import {amountOwedSelector, settingsSelector} from '../../data/selectors';
import {printCurrency} from '../../data/utils';

const getStyles = (isDarkMode: boolean) => {
  const colors = getColors(isDarkMode);
  return StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
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
      flexWrap: 'nowrap',
      flexShrink: 1,
    },
  });
};

export const Owed: React.FC = () => {
  const styles = getStyles(useColorScheme() === 'dark');
  const owed = useAppSelector(amountOwedSelector);
  const settings = useAppSelector(settingsSelector);
  const text = owed >= 0 ? 'You owe' : 'You have overpaid by';
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{text}</Text>
      <Text
        adjustsFontSizeToFit={true}
        allowFontScaling={true}
        style={styles.amount}>
        {printCurrency(
          Math.abs(owed),
          settings?.currency ?? {major: '£', minor: 'p'},
        )}
      </Text>
    </View>
  );
};
