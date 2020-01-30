import { AnyAction } from "redux";
const SET_THEME = '[ ui ] set ui theme';

export const setTheme = (theme: 'dark' | 'light'): AnyAction =>  ({
    type: SET_THEME,
    data: { theme }
})