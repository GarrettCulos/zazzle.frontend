import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from 'redux-logger'
import { environment } from '../environment/environment'
import { config } from './ui/reducer';
 
const logger = createLogger({
    collapsed: true, 
    duration: true, 
    timestamp: true,
    level: 'log',
    logErrors: true,
    diff: true
});

const middleware: any[] = [];
if ( environment.env === 'dev') {
    middleware.push(logger);
}

const rootReducer = combineReducers({config})
export default createStore(
    rootReducer,
    applyMiddleware(...middleware)
);
