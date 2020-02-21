// import { createAction } from 'redux-toolkit';
import { User } from '@appTypes/user';
import { SET_USER, TOGGLE_USER_FAVS } from './user.types';

export const setUser = (user?: User) => ({
  type: SET_USER,
  user
});

export const toggleUserFavorites = (mode: 'add' | 'remove', projectId: string) => ({
  type: TOGGLE_USER_FAVS,
  mode,
  projectId
});
