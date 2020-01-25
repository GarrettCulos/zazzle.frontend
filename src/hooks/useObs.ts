import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { useState, useEffect } from 'react';

export default <T = any, V = any>(obs: Observable<T>): [T, V] => {
  const [value, setState] = useState();
  const [error, setError] = useState();
  useEffect(() => {
    const sub = obs
      .pipe(
        catchError(err => {
          setError(err);
          sub.unsubscribe();
          return of(err);
        })
      )
      .subscribe(val => {
        setState(val);
      });
    return () => sub.unsubscribe();
  }, [obs.source]);
  return [value, error];
};
