import { AppState } from '@store';

export const getUser = (state: AppState) => state.user.user;
