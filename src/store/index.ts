import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { ApolloClient } from 'apollo-boost';
import { createEpicMiddleware, combineEpics } from 'redux-observable';

import { environment } from '@environment/environment';

import { ui, UIState } from './ui/ui.reducer';
import { user, UserState } from './user/user.reducer';
import { authEpic, logoutEpic } from './auth/auth.epic';
import initEpic from './init/init.effect';
import { auth, AuthState } from './auth/auth.reducer';

import client from '@gql';

/**
 * App State type
 */
export interface AppState {
  ui: UIState;
  user: UserState;
  auth: AuthState;
}

/**
 *
 * Middleware
 *
 */
const middleware: any[] = [];

/** Logger middleware */
const logger = createLogger({
  collapsed: true,
  duration: true,
  timestamp: true,
  level: 'log',
  logErrors: true,
  diff: true
});
if (environment.env === 'dev') {
  middleware.push(logger);
}

/** Epic middleware */
const epicMiddleware = createEpicMiddleware<any, any, AppState, { apollo: ApolloClient<any> }>({
  dependencies: { apollo: client }
});
const rootEpic = combineEpics(authEpic, logoutEpic, initEpic);
middleware.push(epicMiddleware);

const rootReducer = combineReducers({ ui, user, auth });
const store = createStore(rootReducer, applyMiddleware(...middleware));
epicMiddleware.run(rootEpic);
export default store;
