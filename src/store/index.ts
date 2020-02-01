import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { environment } from '../environment/environment';
import { ui, UIState } from './ui/ui.reducer';
import { user, UserState } from './user/user.reducer';

const logger = createLogger({
  collapsed: true,
  duration: true,
  timestamp: true,
  level: 'log',
  logErrors: true,
  diff: true
});

const middleware: any[] = [];
if (environment.env === 'dev') {
  middleware.push(logger);
}

export interface AppState {
  ui: UIState;
  user: UserState;
}

const rootReducer = combineReducers({ ui, user });
export default createStore(rootReducer, applyMiddleware(...middleware));
