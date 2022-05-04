import {createAction} from '@reduxjs/toolkit';
import {Payment} from './types';

export const payment = createAction<Payment | undefined>('payment');
