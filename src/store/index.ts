import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware, combineEpics } from 'redux-observable';

import { environment } from '@environment/environment';

import { ui, UIState } from './ui/ui.reducer';
import { user, UserState } from './user/user.reducer';
import initEpic from './init/init.effect';
import authEpic from './auth/auth.epic';
import { auth, AuthState } from './auth/auth.reducer';

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
const epicMiddleware = createEpicMiddleware<any, any, AppState, any>();
const rootEpic = combineEpics(initEpic, authEpic);
epicMiddleware.run(rootEpic);
middleware.push(epicMiddleware);

const rootReducer = combineReducers({ ui, user, auth });
export default createStore(rootReducer, applyMiddleware(...middleware));
