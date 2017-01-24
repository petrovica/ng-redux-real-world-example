import { Action } from '@ngrx/store';

import { createReducer } from '../List/List.reducer';
import { RepoState } from './Repo.types';
import * as ActionTypes from './Repo.actions';

const initialState: RepoState = {
  login: null,
  name: null
};


export const repoReducer = (state: RepoState = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.REPO_CHANGED:
      return Object.assign({}, state, {
        login: action.payload.login,
        name: action.payload.name
      });

    default:
      return state;
  }
};

export const stargazersPaginationReducer = createReducer(
  [ActionTypes.STARGAZERS_REQUEST, ActionTypes.STARGAZERS_SUCCESS, ActionTypes.STARGAZERS_FAILURE],
  action => action.payload.fullName
);
