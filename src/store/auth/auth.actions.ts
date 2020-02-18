import { SET_AUTH, LOGOUT } from './auth.types';
import { AuthData } from '@appTypes/auth';

export const setAuth = (authData: AuthData) => ({
  type: SET_AUTH,
  authData
});

export const logout = () => ({
  type: LOGOUT
});
