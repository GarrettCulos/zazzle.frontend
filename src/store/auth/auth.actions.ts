import { SET_AUTH } from './auth.types';
import { AuthData } from '@appTypes/auth';

export const setAuth = (authData: AuthData) => ({
  type: SET_AUTH,
  authData
});
