import { AnyAction } from 'redux';
import { User } from '@appTypes/user';
import { SET_USER, TOGGLE_USER_FAVS } from './user.types';

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
    case TOGGLE_USER_FAVS: {
      let newFavorites = state.user ? state.user.favorites.filter(fav => fav.projectId !== action.projectId) : [];
      if (action.mode === 'add') {
        newFavorites = [...newFavorites, { projectId: action.projectId }];
      }
      return {
        ...state,
        user: {
          ...state.user,
          favorites: newFavorites
        }
      };
    }
    default:
      return state;
  }
};
