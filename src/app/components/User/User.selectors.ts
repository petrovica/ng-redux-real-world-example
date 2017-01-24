import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/withLatestFrom';

import AppState from '../../state';
import { getUser as getState, getStarredPagination as getPagination } from '../../selectors';
import { getUsers, getRepos } from './../EntityRepository/EntityRepository.selectors';

export const getLogin = (appStore: Store<AppState>) =>
  getState(appStore).map(state => state.login).distinctUntilChanged();

export const getUser = (appStore: Store<AppState>) => Observable.combineLatest(
  getLogin(appStore),
  getUsers(appStore),
  (login, users) => users[login] || null
).distinctUntilChanged();

export const getStarred = (appStore: Store<AppState>) => Observable.combineLatest(
  getLogin(appStore),
  getPagination(appStore),
  getRepos(appStore),
  (login, pagination, repos) => {
    if (!login || !pagination[login]) {
      return [];
    }

    return pagination[login].ids.map(id => repos[id]);
  }
).distinctUntilChanged();

export const getStarredPagination = (appStore: Store<AppState>) => Observable.combineLatest(
  getLogin(appStore),
  getPagination(appStore),
  (login, pagination) => pagination[login]
).filter(pagination => !!pagination).distinctUntilChanged();
