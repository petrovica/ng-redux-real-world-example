import { getLogin } from './User.selectors';
import { Observable } from 'rxjs/Observable';
import * as Schemas from './../../api/Github.schemas';
import { Store, Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';

import AppState from '../../state';
import { getStarredPagination } from './../../selectors';
import { GithubService } from './../../api/Github.service';
import { getUsers } from './../EntityRepository/EntityRepository.selectors';
import * as ActionTypes from './User.actions';


@Injectable()
export class UserEffects {

  @Effect() userChanged$ = this.actions$
    .ofType(ActionTypes.USER_CHANGED)
    .mergeMap(({ payload }) => Observable.of(
      { type: ActionTypes.LOAD_USER, payload: { login: payload } },
      { type: ActionTypes.LOAD_STARRED, payload: { login: payload } }
    ));

  @Effect() checkUserCache$ = this.actions$
    .ofType(ActionTypes.LOAD_USER)
    .withLatestFrom(getUsers(this.store))
    .filter(([{ payload }, users]) => !users[payload.login])
    .map(([{ payload }]) => ({
      type: ActionTypes.USER_REQUEST,
      payload
    }));

  @Effect() fetchUser$ = this.actions$
    .ofType(ActionTypes.USER_REQUEST)
    .switchMap(({ payload }) => this.github.request(
        `users/${payload.login}`,
        payload,
        Schemas.USER,
        ActionTypes.USER_SUCCESS,
        ActionTypes.USER_FAILURE
    ));

  @Effect() checkStarredCache$ = this.actions$
    .ofType(ActionTypes.LOAD_STARRED)
    .withLatestFrom(getStarredPagination(this.store))
    .filter(([{ payload }, pagination]) => {
      const {
        pageCount = 0
      } = pagination[payload.login] || {};

      return pageCount === 0 || payload.nextPage;
    })
    .map(([{ payload }]) => (<Action>{
      type: ActionTypes.STARRED_REQUEST,
      payload
    }));

  @Effect() fetchStarred$ = this.actions$
    .ofType(ActionTypes.STARRED_REQUEST)
    .withLatestFrom(getStarredPagination(this.store))
    .switchMap(([{ payload }, pagination]) => {
      const {
        nextPageUrl = `users/${payload.login}/starred`
      } = pagination[payload.login] || {};

      return this.github.request(
        nextPageUrl,
        payload,
        [Schemas.REPO],
        ActionTypes.STARRED_SUCCESS,
        ActionTypes.STARRED_FAILURE
      );
    });

  @Effect() loadMoreStarred$ = this.actions$
    .ofType(ActionTypes.LOAD_MORE_STARRED)
    .withLatestFrom(getLogin(this.store))
    .map(([ action, login ]) => <Action>{
      type: ActionTypes.LOAD_STARRED,
      payload: {
        login,
        nextPage: true
      }
    });

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private github: GithubService
  ) {}

}
