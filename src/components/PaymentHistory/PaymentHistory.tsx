import React from 'react';
import {
  Button,
  FlatList,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {paymentHistorySelector} from '../../data/selectors';
import {useAppSelector} from '../../data/store';
import {getColors} from '../../styles/colors';
import {TITLE_FONT, BASE_FONT} from '../../styles/typography';

const getStyles = (isDarkMode: boolean) => {
  const colors = getColors(isDarkMode);
  return StyleSheet.create({
    modal: {},
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

export type PaymentHistoryProps = {
  showPaymentHistory: boolean;
  setShowPaymentHistory: (show: boolean) => void;
};

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

export const PaymentHistory: React.FC<PaymentHistoryProps> = ({
  setShowPaymentHistory,
  showPaymentHistory,
}) => {
  const styles = getStyles(useColorScheme() === 'dark');
  const history = useAppSelector(paymentHistorySelector);
  const renderItem = ({item}) => {
    return <Item {...item} />;
  };
  return (
    <Modal
      style={styles.modal}
      animationType="slide"
      visible={showPaymentHistory}
      presentationStyle="pageSheet">
      <View style={styles.buttonRow}>
        <View style={styles.done}>
          <Button title="Done" onPress={() => setShowPaymentHistory(false)} />
        </View>
      </View>
      <SafeAreaView>
        <FlatList
          data={history}
          renderItem={renderItem}
          keyExtractor={item => item.key}
        />
      </SafeAreaView>
    </Modal>
  );
};
