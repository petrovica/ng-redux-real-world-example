import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Schema, normalize } from 'normalizr';

import AppState from '../../state';
import Actions, * as ActionTypes from './EntityRepository.actions';

@Injectable()
export class EntityRepositoryService {

  constructor(private store: Store<AppState>) {}

  normalizeAndStore<T>(data: T, schema: Schema) {
    const {
      result,
      entities
    } = normalize(data, schema);

    this.store.dispatch(<ActionTypes.ENTITY_REPOSITORY_HAS_CHANGED>{
      type: ActionTypes.ENTITY_REPOSITORY_HAS_CHANGED,
      payload: entities
    });

    return result;
  }
}
