import { Action } from '@ngrx/store';
import { union } from 'lodash';

import { ListState } from './List.types';


const initialState: ListState = {

};

export const createReducer = (types: string[], mapActionToKey: Function) => {
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected types to be an array of three elements.');
  }
  if (!types.every(t => typeof t === 'string')) {
    throw new Error('Expected types to be strings.');
  }
  if (typeof mapActionToKey !== 'function') {
    throw new Error('Expected mapActionToKey to be a function.');
  }

  const [ requestType, successType, failureType ] = types;

  const updatePagination = (state = {
    isFetching: false,
    nextPageUrl: undefined,
    pageCount: 0,
    ids: []
  }, action) => {
    switch (action.type) {
      case requestType:
        return Object.assign({}, state, { isFetching: true });

      case successType:
        return Object.assign({}, state, {
          isFetching: false,
          ids: union(state.ids, action.payload.data),
          nextPageUrl: action.payload.nextPageUrl,
          pageCount: state.pageCount + 1
        });

      case failureType:
        return Object.assign({}, state, { isFetching: false });

      default:
        return state;
    }
  };

  return (state: ListState = initialState, action: Action) => {
    // Update pagination by key
    switch (action.type) {
      case requestType:
      case successType:
      case failureType:
        const key = mapActionToKey(action);
        if (typeof key !== 'string') {
          throw new Error('Expected key to be a string.');
        }

        return Object.assign({}, state, { [key]: updatePagination(state[key], action) });

      default:
        return state;
    }
  };
};
