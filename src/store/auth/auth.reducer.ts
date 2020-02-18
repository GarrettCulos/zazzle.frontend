import { AnyAction } from 'redux';
import { AuthData } from '@appTypes/auth';
import { SET_AUTH, LOGOUT } from './auth.types';

export interface AuthState {
  auth: AuthData | undefined;
  jwtToken: string | undefined;
}

const initialAuthState: AuthState = {
  auth: undefined,
  jwtToken: localStorage.getItem('token') || undefined
};

export const auth = (state: AuthState = initialAuthState, action: AnyAction) => {
  switch (action.type) {
    case SET_AUTH: {
      return {
        ...state,
        jwtToken: action.authData.token,
        auth: action.authData
      };
    }
    case LOGOUT: {
      return { ...state, jwtToken: undefined, auth: undefined };
    }
    default:
      return state;
  }
};
