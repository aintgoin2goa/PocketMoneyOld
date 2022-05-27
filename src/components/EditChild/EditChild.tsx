import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, useColorScheme, View} from 'react-native';
import {StackList} from '../../types';
import {activeChildDetailsSelector} from '../../data/selectors';
import {useAppDispatch, useAppSelector} from '../../data/store';
import {editChild} from '../../data/actions';
import {Child, CurrencySymbol} from '../../data/types';
import {BASE_FONT} from '../../styles/typography';
import {getColors} from '../../styles/colors';
import {splitCurrencyAmount} from '../../data/utils';
import DropDownPicker from 'react-native-dropdown-picker';
import {PrimaryActionButton} from '../shared/PrimaryActionButton';

export type EditChildProps = NativeStackScreenProps<StackList, 'Edit Child'>;

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

const currencyMap = new Map<string, CurrencySymbol>([
  ['£', {major: '£', minor: 'p'}],
]);

const currencies = Array.from(currencyMap.keys()).map(k => ({
  label: k,
  value: k,
}));

export const EditChild: React.FC<EditChildProps> = ({navigation}) => {
  const styles = getStyles(useColorScheme() === 'dark');
  const child = useAppSelector(activeChildDetailsSelector) as Child;
  const [name, setName] = useState(child.name);
  const pocketMoneyAmounts = splitCurrencyAmount(
    child.settings.pocketMoneyPerWeek,
  );
  const [pounds, setPounds] = useState(pocketMoneyAmounts[0]);
  const [pence, setPence] = useState(pocketMoneyAmounts[1]);

  const [dayDropdownOpen, setDayDropdownOpen] = useState(false);
  const [day, setDay] = useState(child.settings.payDay);
  const [dayItems, setDayItems] = useState(daysOfWeek);

  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [currency, setCurrency] = useState(child.settings.currency.major);
  const [currencyItems, setCurrencyItems] = useState(currencies);

  const dispatch = useAppDispatch();

  const onSave = () => {
    const currencyToSave = currencyMap.get(currency) ?? {
      major: '£',
      minor: 'p',
    };
    const pocketMoneyPerWeek = pounds * 100 + pence;
    const childToSave: Child = {
      ...child,
      name,
      settings: {
        ...child.settings,
        currency: currencyToSave,
        payDay: day,
        pocketMoneyPerWeek,
      },
    };
    console.log('SAVE', childToSave);
    dispatch({type: editChild.type, payload: childToSave});
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <Text style={styles.labelText}>Name</Text>
        <TextInput value={name} style={styles.input} onChangeText={setName} />
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
            onChangeText={text => setPounds(Number(text))}
          />
          <Text style={styles.inlineLabelText}>.</Text>
          <TextInput
            style={styles.input}
            value={String(pence)}
            onChangeText={text => setPence(Number(text))}
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

      <PrimaryActionButton onPress={onSave} text="Save" />
    </View>
  );
};
