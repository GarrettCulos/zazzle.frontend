// combineEpics,
import { ofType } from 'redux-observable';
import { switchMap } from 'rxjs/operators';
import { SET_AUTH } from './auth.types';
import { of } from 'rxjs';

// persist state in local storage every 1s
const authEpic = action$ =>
  action$.pipe(
    ofType(SET_AUTH),
    switchMap(action => {
      console.log('get jwt token from api');
      return of({ type: 'none' });
    })
  );

export default authEpic;
