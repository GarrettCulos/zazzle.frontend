import { Action } from "redux";

export interface  UIState {
    theme: 'dark' | 'light'
}

const initialUIState:UIState = {
  theme: 'light'
};

export const config = (state:UIState = initialUIState, action: Action) => {
    switch(action.type){
        default:
            return state;
    }
}