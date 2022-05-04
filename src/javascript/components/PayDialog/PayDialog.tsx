import React, {useState} from 'react';
import {MoneyInput} from './MoneyInput';
import {useAppDispatch, useAppSelector} from '../../data/store';
import {amountOwedSelector, settingsSelector} from '../../data/selectors';
import {SlideModal} from 'react-native-slide-modal';
import {payment} from '../../data/actions';

// const getStyles = (isDarkMode: boolean) => {
//   const colors = getColors(isDarkMode);
//   return StyleSheet.create({
//     container: {},
//     inputContainer: {},
//     submit: {},
//     submitText: {},
//     cancel: {},
//     cancelIcon: {},
//   });
// };

export type PayDialogProps = {
  showPayDialog: boolean;
  setShowPayDialog: (show: boolean) => void;
};

export const PayDialog: React.FC<PayDialogProps> = ({
  showPayDialog,
  setShowPayDialog,
}) => {
  //   const styles = getStyles(useColorScheme() === 'dark');
  const settings = useAppSelector(settingsSelector);
  const owed = useAppSelector(amountOwedSelector);
  const [amount, setAmount] = useState(owed);
  const dispatch = useAppDispatch();
  const onDone = () => {
    dispatch({
      type: payment.type,
      payload: {
        date: new Date(),
        owed,
        paid: amount,
        remaining: owed - amount,
      },
    });
  };
  return (
    <SlideModal
      modalType="iOS Bottom Sheet"
      modalVisible={showPayDialog}
      modalHeaderTitle="Pay Pocket Money"
      screenContainer={<></>}
      pressCancel={() => setShowPayDialog(false)}
      doneDisabled={false}
      pressDone={onDone}
      modalContainer={
        <MoneyInput
          currency={settings.currency}
          step={settings.pocketMoneyPerWeek}
          initial={amount}
          setAmount={setAmount}
        />
      }
    />
  );
};
