import { AnyAction } from "redux";
import { User, UserErrors } from '../../types/user';

export const SET_USER = '[ ui ] set ui theme';

export class SetUser implements AnyAction {
    type = SET_USER
    constructor(public user: User | UserErrors | undefined){}
}