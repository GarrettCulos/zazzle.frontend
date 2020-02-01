import { Action } from 'redux';
import { User, UserErrors } from '@types/user';
import { SET_USER, SetUser } from './user.actions';

export interface UserState {
  user: User | UserErrors | undefined;
}

const initialUserState: UserState = {
  user: undefined
};

export const user = (state: UserState = initialUserState, action: Action) => {
  switch (action.type) {
    case SET_USER: {
      return (action as SetUser).user;
    }
    default:
      return state;
  }
};
