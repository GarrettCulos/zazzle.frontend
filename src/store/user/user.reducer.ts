import { AnyAction } from 'redux';
import { User } from '@appTypes/user';
import { SET_USER } from './user.types';

export interface UserState {
  user: User | undefined;
}

const initialUserState: UserState = {
  user: undefined
};

export const user = (state: UserState = initialUserState, action: AnyAction) => {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        user: action.user
      };
    }
    default:
      return state;
  }
};
