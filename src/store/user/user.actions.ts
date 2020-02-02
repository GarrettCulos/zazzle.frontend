// import { createAction } from 'redux-toolkit';
import { User } from '@appTypes/user';
import { SET_USER } from './user.types';

export const setUser = (user: User | undefined) => ({
  type: SET_USER,
  user
});
