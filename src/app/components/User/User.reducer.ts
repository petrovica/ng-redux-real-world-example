import { Action } from '@ngrx/store';

import { createReducer } from './../List/List.reducer';
import { UserState } from './User.types';
import * as ActionTypes from './User.actions';

const initialState: UserState = {
  login: null
};


export const userReducer = (state: UserState = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.USER_CHANGED:
      return Object.assign({}, state, { login: action.payload });

    default:
      return state;
  }
};

export const starredPaginationReducer = createReducer(
  [ActionTypes.STARRED_REQUEST, ActionTypes.STARRED_SUCCESS, ActionTypes.STARRED_FAILURE],
  action => action.payload.login
);
