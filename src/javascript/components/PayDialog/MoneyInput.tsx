import React from 'react';
import {Text} from 'react-native';
import {CurrencySymbol} from '../../data/types';
import {printCurrency} from '../../data/utils';

export type MoneyInputProps = {
  currency: CurrencySymbol;
  initial: number;
  setAmount: (amount: number) => void;
  step: number;
};

export const MoneyInput: React.FC<MoneyInputProps> = ({
  currency,
  initial,
  //   step,
}) => {
  return <Text>{printCurrency(initial, currency)}</Text>;
};
