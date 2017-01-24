import { getFullName } from './Repo.selectors';
import { Observable } from 'rxjs/Observable';
import { Store, Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import AppState from '../../state';
import * as ActionTypes from './Repo.actions';
import { getRepos } from './../EntityRepository/EntityRepository.selectors';
import { getStargazersPagination } from './../../selectors';
import { GithubService } from './../../api/Github.service';
import * as Schemas from './../../api/Github.schemas';


@Injectable()
export class RepoEffects {

  @Effect() userChanged$ = this.actions$
    .ofType(ActionTypes.REPO_CHANGED)
    .mergeMap(({ payload }) => {
      const fullName = `${payload.login}/${payload.name}`;
      return Observable.of(
        { type: ActionTypes.LOAD_REPO, payload: { fullName } },
        { type: ActionTypes.LOAD_STARGAZERS, payload: { fullName } }
      );
    });

  @Effect() checkRepoCache$ = this.actions$
    .ofType(ActionTypes.LOAD_REPO)
    .withLatestFrom(getRepos(this.store))
    .filter(([{ payload }, repos]) => !repos[payload.fullName])
    .map(([{ payload }]) => ({
      type: ActionTypes.REPO_REQUEST,
      payload
    }));

  @Effect() fetchRepo$ = this.actions$
    .ofType(ActionTypes.REPO_REQUEST)
    .switchMap(({ payload }) => this.github.request(
      `repos/${payload.fullName}`,
      payload,
      Schemas.REPO,
      ActionTypes.REPO_SUCCESS,
      ActionTypes.REPO_FAILURE
    ));

  @Effect() checkStargazersCache$ = this.actions$
    .ofType(ActionTypes.LOAD_STARGAZERS)
    .withLatestFrom(getStargazersPagination(this.store))
    .filter(([{ payload }, pagination]) => {
      const {
        pageCount = 0
      } = pagination[payload.fullName] || {};

      return pageCount === 0 || payload.nextPage;
    })
    .map(([{ payload }]) => (<Action>{
      type: ActionTypes.STARGAZERS_REQUEST,
      payload
    }));

  @Effect() fetchStargazers$ = this.actions$
    .ofType(ActionTypes.STARGAZERS_REQUEST)
    // Should effects load data from store?
    .withLatestFrom(getStargazersPagination(this.store))
    .switchMap(([{ payload }, pagination]) => {
      const {
        nextPageUrl = `repos/${payload.fullName}/stargazers`,
      } = pagination[payload.fullName] || {};

      return this.github.request(
        nextPageUrl,
        payload,
        [Schemas.USER],
        ActionTypes.STARGAZERS_SUCCESS,
        ActionTypes.STARGAZERS_FAILURE
      );
    });

  @Effect() loadMoreStargazers$ = this.actions$
    .ofType(ActionTypes.LOAD_MORE_STARGAZERS)
    .withLatestFrom(getFullName(this.store))
    .map(([ action, fullName ]) => <Action>{
      type: ActionTypes.LOAD_STARGAZERS,
      payload: {
        fullName,
        nextPage: true
      }
    });


  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private github: GithubService
  ) {}

}
