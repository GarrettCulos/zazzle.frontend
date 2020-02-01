import { connect, ConnectedProps as ConnectedPropsCopy } from 'react-redux';
import { AppState } from '@store';

export interface ConnectedProps<T> extends ConnectedPropsCopy<T> {}
export class ReduxConnector {
  public connector: Function;
  constructor(public mapState?: (state: AppState) => any, public mapDispatch?: { [f: string]: Function }) {
    this.connector = connect(mapState, mapDispatch);
  }
}
