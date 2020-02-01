import { Action } from 'redux';

export interface UIState {
  theme: 'dark' | 'light';
}

const initialUIState: UIState = {
  theme: 'light'
};

export const ui = (state: UIState = initialUIState, action: Action) => {
  switch (action.type) {
    default:
      return state;
  }
};
