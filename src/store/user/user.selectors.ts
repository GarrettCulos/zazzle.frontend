import { AppState } from '@store';
import { createSelector } from 'reselect';
export const getUser = (state: AppState) => state.user.user;
export const projectIsFavorite = createSelector(
  getUser,
  (_, projectId) => projectId,
  (user, projectId) => {
    if (user && user.favorites) {
      return user.favorites.some(fav => fav.projectId === projectId);
    }
    return false;
  }
);
