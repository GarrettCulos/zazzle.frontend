import { ofType } from 'redux-observable';
import { switchMap, withLatestFrom } from 'rxjs/operators';
import { gql, ApolloClient } from '@apollo/client';
import { Observable } from 'rxjs';
import { getJwtToken } from '@store/auth/auth.selectors';
import { logout } from '@store/auth/auth.actions';
import { setUser } from '@store/user/user.actions';

const GET_CURRENT_USER = gql`
  query currentUser {
    currentUser {
      email
      id
      userIcon
      userName
      myProjects {
        id
        title
        private
        updatedAt
      }
      favorites {
        projectId
      }
    }
  }
`;

const initObservable = (token, apollo) =>
  Observable.create(async observer => {
    const DONE = { type: 'done' };
    if (token) {
      try {
        const response: any = await apollo.query({ query: GET_CURRENT_USER });
        if (!response.data.currentUser) {
          observer.next(logout());
        } else {
          observer.next(setUser(response.data.currentUser));
        }
      } catch (err) {
        observer.next(logout());
        observer.next(DONE);
      }
    } else {
      observer.next(DONE);
    }
    observer.complete();
  });
// persist state in local storage every 1s
const initEpic = (action$, store$, { apollo }: { apollo: ApolloClient<any> }) =>
  action$.pipe(
    ofType('INIT'),
    withLatestFrom(store$),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    switchMap(([action, store]) => {
      const token = getJwtToken(store);
      return initObservable(token, apollo);
    })
  );

export default initEpic;
