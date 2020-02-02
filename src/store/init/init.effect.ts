import { combineEpics } from 'redux-observable';
import { tap } from 'rxjs/operators';

// persist state in local storage every 1s
const initEpic = (action$, store) =>
  action$.pipe(
    tap(action => {
      console.log(action, store);
      // handle side-effects
      //   saveState(store.value);
    })
  );

export default combineEpics(initEpic);
