import { AnyAction } from 'redux';
import { AuthData } from '@appTypes/auth';
import { SET_AUTH } from './auth.types';

export interface AuthState {
  auth: AuthData | undefined;
  jwtToken: string | undefined;
}

const initialAuthState: AuthState = {
  auth: undefined,
  jwtToken: undefined
};

export const auth = (state: AuthState = initialAuthState, action: AnyAction) => {
  switch (action.type) {
    case SET_AUTH: {
      return {
        ...state,
        auth: action.authData
      };
    }
    default:
      return state;
  }
};
