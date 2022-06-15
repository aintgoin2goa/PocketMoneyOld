import React, {useState} from 'react';
import {MoneyInput} from './MoneyInput';
import {useAppDispatch, useAppSelector} from '../../../data/store';
import {
  activeChildSelector,
  amountOwedSelector,
  settingsSelector,
} from '../../../data/selectors';
import {payment} from '../../../data/actions';
import {formatDate} from '../../../data/utils';
import {Payment} from '../../../data/types';
import {ActionSheet} from '../../shared/ActionSheet';

export type PayDialogProps = {
  showPayDialog: boolean;
  setShowPayDialog: (show: boolean) => void;
};

export const PayDialog: React.FC<PayDialogProps> = ({
  showPayDialog,
  setShowPayDialog,
}) => {
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
    <ActionSheet
      show={showPayDialog}
      setShow={setShowPayDialog}
      onDone={onDone}>
      <MoneyInput
        currency={settings.currency}
        pocketMoneyPerWeek={settings.pocketMoneyPerWeek}
        amount={amount}
        owed={owed}
        step={settings.pocketMoneyPerWeek / 2}
        setAmount={setAmount}
      />
    </ActionSheet>
  );
};
