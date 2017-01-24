import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { go } from '@ngrx/router-store';
import 'rxjs/add/operator/map';

import * as ActionTypes from './Explore.actions';
import { EntityRepositoryService } from '../EntityRepository/EntityRepository.service';

@Injectable()
export class ExploreEffects {

  @Effect() explore$ = this.actions$
    .ofType(ActionTypes.EXPLORE)
    .map(({ payload }) => go([payload]));

  constructor(
    private actions$: Actions,
    private entityRepository: EntityRepositoryService
  ) {}

}
