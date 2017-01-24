import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/mergeMap';

import AppState from '../../state';
import * as ActionTypes from './Repo.actions';
import { Pagination } from './../List/List.types';
import { Repo, User } from '../../api/Github.types';
import { getName, getRepo, getStargazers, getStargazersPagination } from './Repo.selectors';

@Component({
  selector: 'app-repo-container',
  template: `
    <div>
      <h1 *ngIf="!(repo$ | async)">
        <i>Loading {{name$ | async}} details...</i>
      </h1>
      <app-repo
        *ngIf="repo$ | async"
        [repo]="repo$ | async"
      ></app-repo>
      <hr />

      <app-list
        [items]="stargazers$ | async"
        [pagination]="stargazersPagination$ | async"
        (loadMore)="onLoadMore()"
      >
        <template let-item="item">
          <app-user [user]="item"></app-user>
        </template>
      </app-list>
    </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RepoContainerComponent  implements OnInit, OnDestroy {

  name$: Observable<string>;
  repo$: Observable<Repo>;
  stargazers$: Observable<User[]>;
  stargazersPagination$: Observable<Pagination>;

  paramChangesSubscription: Subscription;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {
    this.name$ = getName(store);
    this.repo$ = getRepo(store);
    this.stargazers$ = getStargazers(store);
    this.stargazersPagination$ = getStargazersPagination(store);
  }

  ngOnInit() {
    this.paramChangesSubscription = this.route.params.subscribe(params => {
      this.store.dispatch({
        type: ActionTypes.REPO_CHANGED,
        payload: {
          login: params['login'],
          name: params['name']
        }
      });
    });
  }

  onLoadMore() {
    this.store.dispatch({
      type: ActionTypes.LOAD_MORE_STARGAZERS
    });
  }

  ngOnDestroy() {
    this.paramChangesSubscription.unsubscribe();
  }

}
