import { EntityRepositoryState } from './EntityRepository.types';

export const ENTITY_REPOSITORY_HAS_CHANGED = 'ENTITY_REPOSITORY_HAS_CHANGED';
export type ENTITY_REPOSITORY_HAS_CHANGED = {
  type: 'ENTITY_REPOSITORY_HAS_CHANGED',
  payload: EntityRepositoryState
};

type Actions = ENTITY_REPOSITORY_HAS_CHANGED;
export default Actions;
