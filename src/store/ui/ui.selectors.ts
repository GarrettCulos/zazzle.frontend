import { AppState } from '@store';
import { createSelector } from 'reselect';
import { UIError } from './ui.reducer';
import { getUser } from '@store/user/user.selectors';
import { isJwtTokenAuthenticated, isProviderAuthenticated } from '@store/auth/auth.selectors';

export const getUi = (state: AppState) => state.ui;
export const getErrorByIds = (state: AppState) => state.ui.error;
export const getLoadingByIds = (state: AppState) => state.ui.loading;
export const isProjectCreationOpen = (state: AppState) => state.ui.createProjectModelOpen;

export const getLoadingEvents = createSelector(getLoadingByIds, loading => {
  return loading ? Object.keys(loading).map(key => loading[key]) : [];
});

export const getErrorsByType = createSelector(
  getErrorByIds,
  (_, type: string) => type,
  (error, type) =>
    Object.keys(error).reduce((arr: UIError[], key: string) => {
      if (error[key] && error[key].type === type) {
        arr.push(error[key]);
      }
      return arr;
    }, [])
);

export const showLoginSection = createSelector(
  getUser,
  isJwtTokenAuthenticated,
  isProviderAuthenticated,
  (user, jwtToken, providerAuthed) => {
    return !user && !jwtToken;
  }
);

export const getSideNavState = (state: AppState) => state.ui.sideNavState;
