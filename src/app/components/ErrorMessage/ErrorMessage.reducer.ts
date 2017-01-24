import { Action } from '@ngrx/store';

import * as ActionTypes from './ErrorMessage.actions';
import { ErrorMessageState } from './ErrorMessage.types';


const initialState: ErrorMessageState = null;

export default (state: ErrorMessageState = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.RESET_ERROR_MESSAGE:
      return null;

    default:
      return action.payload ? action.payload.error : null;
  }
};
