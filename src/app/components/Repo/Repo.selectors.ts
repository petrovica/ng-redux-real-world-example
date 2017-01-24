import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';

import AppState from '../../state';
import { getRepo as getState, getStargazersPagination as getPagination } from './../../selectors';
import { getRepos, getUsers } from './../EntityRepository/EntityRepository.selectors';

export const getName = (appStore: Store<AppState>) =>
  getState(appStore).map(state => state.name).distinctUntilChanged();

export const getFullName = (appStore: Store<AppState>) =>
  getState(appStore).map(state => `${state.login}/${state.name}`).distinctUntilChanged();

export const getRepo = (appStore: Store<AppState>) => Observable.combineLatest(
  getFullName(appStore),
  getRepos(appStore),
  (fullName, repos) => repos[fullName] || null
).distinctUntilChanged();

export const getStargazers = (appStore: Store<AppState>) => Observable.combineLatest(
  getFullName(appStore),
  getPagination(appStore),
  getUsers(appStore),
  (fullName, pagination, users) => {
    if (!fullName || !pagination[fullName]) {
      return [];
    }

    return pagination[fullName].ids.map(id => users[id]);
  }
).distinctUntilChanged();

export const getStargazersPagination = (appStore: Store<AppState>) => Observable.combineLatest(
  getFullName(appStore),
  getPagination(appStore),
  (fullName, pagination) => pagination[fullName]
).filter(pagination => !!pagination).distinctUntilChanged();
