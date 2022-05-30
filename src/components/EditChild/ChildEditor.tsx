import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, useColorScheme, View} from 'react-native';
import {StackList} from '../../types';
import {
  activeChildDetailsSelector,
  childCountSelector,
} from '../../data/selectors';
import {useAppDispatch, useAppSelector} from '../../data/store';
import {editChild} from '../../data/actions';
import {Child, CurrencySymbol} from '../../data/types';
import {BASE_FONT} from '../../styles/typography';
import {getColors} from '../../styles/colors';
import {splitCurrencyAmount} from '../../data/utils';
import DropDownPicker from 'react-native-dropdown-picker';
import {PrimaryActionButton} from '../shared/PrimaryActionButton';

const getStyles = (isDarkMode: boolean) => {
  const colors = getColors(isDarkMode);
  return StyleSheet.create({
    container: {
      padding: 10,
      flex: 1,
    },
    moneyContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    currencySymbol: {
      fontFamily: BASE_FONT,
      fontSize: 20,
      color: colors.text,
    },
    field: {
      marginBottom: 20,
      marginTop: 10,
    },
    labelText: {
      fontFamily: BASE_FONT,
      fontSize: 20,
      marginBottom: 10,
    },
    inlineLabelText: {
      fontFamily: BASE_FONT,
      fontSize: 20,
      marginHorizontal: 5,
    },
    input: {
      height: 40,
      padding: 5,
      borderWidth: 1,
      borderColor: colors.text,
      fontFamily: BASE_FONT,
      fontSize: 20,
      backgroundColor: colors.background,
      flexGrow: 1,
    },
  });
};

const daysOfWeek = [
  {label: 'Monday', value: 1},
  {label: 'Tuesday', value: 2},
  {label: 'Wednesday', value: 3},
  {label: 'Thursday', value: 4},
  {label: 'Friday', value: 5},
  {label: 'Saturday', value: 6},
  {label: 'Sunday', value: 0},
];

const CURRENCY_POUNDS = {major: '£', minor: 'p'};

const currencyMap = new Map<string, CurrencySymbol>([
  [CURRENCY_POUNDS.major, CURRENCY_POUNDS],
]);

const currencies = Array.from(currencyMap.keys()).map(k => ({
  label: k,
  value: k,
}));

export type ChildEditorProps = {
  child?: Child;
  onSave: (child: Child) => void;
};

export const ChildEditor: React.FC<ChildEditorProps> = ({child, onSave}) => {
  const styles = getStyles(useColorScheme() === 'dark');
  const [name, setName] = useState(child?.name ?? '');
  const pocketMoneyAmounts = splitCurrencyAmount(
    child?.settings?.pocketMoneyPerWeek,
  );
  const [pounds, setPounds] = useState(pocketMoneyAmounts[0]);
  const [pence, setPence] = useState(pocketMoneyAmounts[1]);

  const [dayDropdownOpen, setDayDropdownOpen] = useState(false);
  const [day, setDay] = useState(child?.settings?.payDay ?? 0);
  const [dayItems, setDayItems] = useState(daysOfWeek);

  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [currency, setCurrency] = useState(
    child?.settings?.currency.major ?? CURRENCY_POUNDS.major,
  );
  const [currencyItems, setCurrencyItems] = useState(currencies);
  const newId = useAppSelector(childCountSelector);

  const onSaveClick = () => {
    const currencyToSave = currencyMap.get(currency) ?? CURRENCY_POUNDS;
    const pocketMoneyPerWeek = pounds * 100 + pence;
    const childToSave: Child = {
      id: child?.id ?? newId,
      name,
      payments: child?.payments ?? [],
      settings: {
        ...(child?.settings ?? {}),
        currency: currencyToSave,
        payDay: day,
        pocketMoneyPerWeek,
      },
    };

    onSave(childToSave);
  };

  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <Text style={styles.labelText}>Name</Text>
        <TextInput
          value={name}
          style={styles.input}
          onChangeText={setName}
          returnKeyType="next"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.labelText}>Currency</Text>
        <DropDownPicker
          open={currencyDropdownOpen}
          setOpen={setCurrencyDropdownOpen}
          items={currencyItems}
          setItems={setCurrencyItems}
          value={currency}
          setValue={setCurrency}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.labelText}>Pocket money per week</Text>
        <View style={styles.moneyContainer}>
          <Text style={styles.inlineLabelText}>£</Text>
          <TextInput
            style={styles.input}
            value={String(pounds)}
            keyboardType="numeric"
            onChangeText={text => setPounds(Number(text))}
            returnKeyType="next"
          />
          <Text style={styles.inlineLabelText}>.</Text>
          <TextInput
            style={styles.input}
            value={String(pence)}
            keyboardType="numeric"
            onChangeText={text => setPence(Number(text))}
            returnKeyType="next"
          />
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.labelText}>Pocket money day</Text>
        <DropDownPicker
          open={dayDropdownOpen}
          setOpen={setDayDropdownOpen}
          items={dayItems}
          setItems={setDayItems}
          value={day}
          setValue={setDay}
          maxHeight={400}
        />
      </View>

      <PrimaryActionButton onPress={onSaveClick} text="Save" />
    </View>
  );
};
