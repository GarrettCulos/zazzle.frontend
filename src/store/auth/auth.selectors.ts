import { AppState } from '@store';

export const isProviderAuthenticated = (state: AppState) => Boolean(state.auth.auth);
export const isJwtTokenAuthenticated = (state: AppState) => Boolean(state.auth.jwtToken);
export const getAuthenticationData = (state: AppState) => state.auth.auth;
