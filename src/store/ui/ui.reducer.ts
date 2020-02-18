import { AnyAction } from 'redux';
import uuid from 'uuid';
import * as UITypes from './ui.types';

export interface UIError {
  id: string;
  data: any;
  type: string;
}
export interface UILoading {
  id: string;
  data: any;
  type: string;
}
export interface UIState {
  theme: 'dark' | 'light';
  sideNavState: 'open' | 'closed' | 'extened';
  error: { [uuid: string]: UIError };
  loading: { [uuid: string]: UILoading };
  createProjectModelOpen: boolean;
}

const initialUIState: UIState = {
  theme: 'light',
  sideNavState: 'closed',
  error: {},
  loading: {},
  createProjectModelOpen: false
};

export const ui = (state: UIState = initialUIState, action: AnyAction) => {
  switch (action.type) {
    case UITypes.SET_PROJECT_MODAL_STATE: {
      return { ...state, createProjectModelOpen: action.state !== undefined ? Boolean(action.state) : !action.state };
    }
    case UITypes.ADD_ERROR: {
      const addError = { ...state.error };
      const id = uuid.v4();
      addError[id] = { id, data: action.data, type: action.errorType };
      return { ...state, error: { ...addError } };
    }
    case UITypes.ADD_LOADING: {
      const loading = { ...state.loading };
      const { id, data, loadType } = action;
      loading[id] = { id, data, type: loadType };
      return { ...state, loading: { ...loading } };
    }
    case UITypes.REMOVE_ERROR: {
      const removedError = { ...state.error };
      delete removedError[action.id];
      return { ...state, error: { ...removedError } };
    }
    case UITypes.REMOVE_LOADING: {
      const removedLoading = { ...state.loading };
      delete removedLoading[action.id];
      return { ...state, loading: { ...removedLoading } };
    }
    case UITypes.SET_SIDENAV_STATE:
      return { ...state, sideNavState: action.sideNavState };
    default:
      return state;
  }
};
