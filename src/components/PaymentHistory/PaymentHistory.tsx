import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {paymentHistorySelector} from '../../data/selectors';
import {useAppSelector} from '../../data/store';
import {getColors} from '../../styles/colors';
import {BASE_FONT} from '../../styles/typography';
import {StackList} from '../../types';

const getStyles = (isDarkMode: boolean) => {
  const colors = getColors(isDarkMode);
  return StyleSheet.create({
    container: {},
    buttonRow: {
      paddingHorizontal: 20,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: colors.text,
      backgroundColor: colors.background,
      borderTopWidth: 1,
      borderTopColor: colors.text,
    },
    done: {},
    listContainer: {},
    item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: colors.text,
      backgroundColor: colors.background,
    },
    date: {
      fontFamily: BASE_FONT,
      fontSize: 14,
    },
    amount: {
      fontFamily: BASE_FONT,
      fontWeight: 'bold',
    },
  });
};

export type PaymentHistoryProps = NativeStackScreenProps<
  StackList,
  'Payment History'
>;

type ItemProps = {
  date: string;
  amount: string;
};

export const Item: React.FC<ItemProps> = ({date, amount}) => {
  const styles = getStyles(useColorScheme() === 'dark');
  return (
    <View style={styles.item}>
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.amount}>{amount}</Text>
    </View>
  );
};

export const PaymentHistory: React.FC<PaymentHistoryProps> = () => {
  const styles = getStyles(useColorScheme() === 'dark');
  const history = useAppSelector(paymentHistorySelector);
  const renderItem = ({item}) => {
    return <Item {...item} />;
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={history}
        renderItem={renderItem}
        keyExtractor={item => item.key}
      />
    </View>
  );
};
