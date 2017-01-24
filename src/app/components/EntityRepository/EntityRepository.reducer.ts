import { EntityRepositoryState } from './EntityRepository.types';
import Actions, * as ActionTypes from './EntityRepository.actions';

const initialState: EntityRepositoryState = {
  users: {},
  repos: {}
};


export default (state: EntityRepositoryState = initialState, action: Actions) => {
  switch (action.type) {
    case ActionTypes.ENTITY_REPOSITORY_HAS_CHANGED:
      return Object.assign({}, state, {
        users: Object.assign({}, state.users, action.payload.users),
        repos: Object.assign({}, state.repos, action.payload.repos)
      });

    default:
      return state;
  }
};
