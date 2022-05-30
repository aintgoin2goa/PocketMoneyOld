import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Pressable, StyleSheet, Text, useColorScheme, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {activeChildSelector} from '../../data/selectors';
import {useAppSelector} from '../../data/store';
import {getColors} from '../../styles/colors';
import {StackList} from '../../types';

const createStyles = (isDarkMode: boolean) => {
  const colors = getColors(isDarkMode);
  return StyleSheet.create({
    container: {
      // flex: 1,
      height: 50,
      padding: 5,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.background,
      borderBottomColor: colors.text,
      borderBottomWidth: 1,
      flexDirection: 'row',
    },
    settingsIcon: {
      alignSelf: 'flex-end',
    },
    childNameContainer: {
      justifyContent: 'center',
      flexGrow: 1,
      flexDirection: 'row',
    },
    childName: {
      fontFamily: 'Helvetica',
      fontSize: 20,
      color: colors.text,
    },
    childMenuIcon: {
      marginLeft: 5,
      marginTop: 2,
    },
  });
};

export type TopBarProps = {
  navigation: NativeStackNavigationProp<StackList, 'Home'>;
};

export const TopBar: React.FC<TopBarProps> = ({navigation}) => {
  const styles = createStyles(useColorScheme() === 'dark');
  const name = useAppSelector(activeChildSelector);
  console.log('Name', name);
  return (
    <View style={styles.container}>
      <View style={styles.childNameContainer}>
        <Text style={styles.childName}>{name}</Text>
        <Icon style={styles.childMenuIcon} name="caret-down" size={20} />
      </View>
      <Pressable onPress={() => navigation.navigate('Edit Child')}>
        <Icon
          name="ios-settings-outline"
          size={30}
          style={styles.settingsIcon}
        />
      </Pressable>
    </View>
  );
};
