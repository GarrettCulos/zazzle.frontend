// combineEpics,
import { ofType } from 'redux-observable';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SET_AUTH, LOGOUT } from './auth.types';
import { setUser } from '../user/user.actions';

// persist state in local storage every 1s
export const authEpic = action$ =>
  action$.pipe(
    ofType(SET_AUTH),
    switchMap((action: any) => {
      localStorage.setItem('token', action.authData.token);
      return of({ type: 'done' });
    })
  );

export const logoutEpic = action$ =>
  action$.pipe(
    ofType(LOGOUT),
    switchMap(() => {
      localStorage.removeItem('token');
      return of(setUser());
    })
  );
