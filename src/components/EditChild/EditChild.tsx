import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {editChild} from '../../data/actions';
import {activeChildDetailsSelector} from '../../data/selectors';
import {useAppDispatch, useAppSelector} from '../../data/store';
import {Child} from '../../data/types';
import {StackList} from '../../types';
import {ChildEditor} from './ChildEditor';

export type EditChildProps = NativeStackScreenProps<StackList, 'Edit Child'>;

export const EditChild: React.FC<EditChildProps> = ({navigation}) => {
  const child = useAppSelector(activeChildDetailsSelector);
  const dispatch = useAppDispatch();

  const onSave = (childToSave: Child) => {
    console.log('SAVE', child);
    dispatch({type: editChild.type, payload: childToSave});
    navigation.navigate('Home');
  };

  return <ChildEditor child={child} onSave={onSave} />;
};
