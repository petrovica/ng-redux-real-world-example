import { Observable } from 'rxjs/Observable';
import { map } from 'lodash';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';

import AppState from '../../state';
import { getEntityRepository as getState } from '../../selectors';
import { Repo } from './../../api/Github.types';
import { Repos } from './EntityRepository.types';

export const getUsers = (appStore: Store<AppState>) =>
  getState(appStore)
    .map(state => state.users)
    .distinctUntilChanged();

export const getRepos = (appStore: Store<AppState>): Observable<Repos> =>
  getState(appStore)
    .map(state => {
      return map(
        state.repos,
        (repo): Repo => Object.assign({}, repo, { owner: state.users[repo.owner] })
      ).reduce((memo, repo) => Object.assign(memo, { [repo.fullName.toLowerCase()]: repo }), {});
    })
    .distinctUntilChanged();
