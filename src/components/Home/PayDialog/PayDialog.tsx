import React, {useState} from 'react';
import {MoneyInput} from './MoneyInput';
import {useAppDispatch, useAppSelector} from '../../../data/store';
import {
  activeChildSelector,
  amountOwedSelector,
  settingsSelector,
} from '../../../data/selectors';
import {payment} from '../../../data/actions';
import {Button, Modal, StyleSheet, useColorScheme, View} from 'react-native';
import {getColors} from '../../../styles/colors';
import {formatDate} from '../../../data/utils';
import {Payment} from '../../../data/types';

const getStyles = (isDarkMode: boolean) => {
  const colors = getColors(isDarkMode);
  return StyleSheet.create({
    container: {
      position: 'absolute',
      backgroundColor: '#00000080',
    },
    modal: {},
    contentContainer: {
      flex: 1,
      marginBottom: 0,
      justifyContent: 'flex-start',
    },
    inputContainer: {
      backgroundColor: colors.background,
      padding: 50,
    },
    buttonRow: {
      paddingHorizontal: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: colors.text,
      backgroundColor: colors.background,
      borderTopWidth: 1,
      borderTopColor: colors.text,
    },
    submit: {},
    cancel: {},
    spacer: {
      flex: 1,
    },
  });
};

export type PayDialogProps = {
  showPayDialog: boolean;
  setShowPayDialog: (show: boolean) => void;
};

export const PayDialog: React.FC<PayDialogProps> = ({
  showPayDialog,
  setShowPayDialog,
}) => {
  const styles = getStyles(useColorScheme() === 'dark');
  const settings = useAppSelector(settingsSelector);
  const owed = useAppSelector(amountOwedSelector);
  const activeChild = useAppSelector(activeChildSelector);
  const [amount, setAmount] = useState(owed);
  const dispatch = useAppDispatch();
  const onDone = () => {
    const payload: Payment = {
      date: formatDate(new Date()),
      owed,
      paid: amount,
      remaining: owed - amount,
      child: activeChild,
    };
    dispatch({
      type: payment.type,
      payload,
    });
  };
  return (
    <Modal
      style={styles.modal}
      animationType="slide"
      visible={showPayDialog}
      onShow={() => setAmount(owed)}
      transparent={true}>
      <View style={styles.contentContainer}>
        <View style={styles.spacer} />
        <View style={styles.buttonRow}>
          <View style={styles.cancel}>
            <Button title="Cancel" onPress={() => setShowPayDialog(false)} />
          </View>
          <View style={styles.submit}>
            <Button
              title="OK"
              onPress={() => {
                onDone();
                setShowPayDialog(false);
              }}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <MoneyInput
            currency={settings.currency}
            amount={amount}
            owed={owed}
            step={settings.pocketMoneyPerWeek}
            setAmount={setAmount}
          />
        </View>
      </View>
    </Modal>
  );
};
