import { SET_THEME, ADD_LOADING, REMOVE_LOADING, ADD_ERROR, REMOVE_ERROR, SET_SIDENAV_STATE } from './ui.types';

export const setTheme = (theme: 'dark' | 'light') => ({
  type: SET_THEME,
  theme
});

export const addLoading = (id: string, loadType: string, data: any) => ({
  type: ADD_LOADING,
  id,
  loadType,
  data
});

export const removeLoading = (id: string) => ({
  type: REMOVE_LOADING,
  id
});

export const addError = (errorType: string, data: any) => ({
  type: ADD_ERROR,
  errorType,
  data
});

export const removeError = (id: string) => ({
  type: REMOVE_ERROR,
  id
});

export const setSideNavState = (sideNavState: 'open' | 'closed' | 'extended') => ({
  type: SET_SIDENAV_STATE,
  sideNavState
});
