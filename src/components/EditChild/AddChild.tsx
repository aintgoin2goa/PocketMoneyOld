import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {addChild} from '../../data/actions';
import {useAppDispatch} from '../../data/store';
import {Child} from '../../data/types';
import {StackList} from '../../types';
import {ChildEditor} from './ChildEditor';

export type AddChildProps = NativeStackScreenProps<StackList, 'Add Child'>;

export const AddChild: React.FC<AddChildProps> = ({navigation}) => {
  const dispatch = useAppDispatch();

  const onSave = async (childToSave: Child) => {
    console.log('SAVE', childToSave);
    dispatch({type: addChild.type, payload: childToSave});
    navigation.navigate('Home');
  };

  return <ChildEditor onSave={onSave} />;
};
