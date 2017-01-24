import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/zip';

import AppState from '../../state';
import * as ActionTypes from './User.actions';
import { Pagination } from './../List/List.types';
import { User, Repo } from '../../api/Github.types';
import { getLogin, getUser, getStarred, getStarredPagination } from './User.selectors';

@Component({
  selector: 'app-user-container',
  template: `
    <div>
      <h1 *ngIf="!(user$ | async)">
        <i>Loading {{login$ | async}}'s profile...</i>
      </h1>
      <app-user
        *ngIf="user$ | async"
        [user]="user$ | async"
      ></app-user>
      <hr />

      <app-list
        [items]="starred$ | async"
        [pagination]="starredPagination$ | async"
        (loadMore)="onLoadMore()"
      >
        <template let-item="item">
          <app-repo [repo]="item"></app-repo>
        </template>
      </app-list>
    </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserContainerComponent  implements OnInit, OnDestroy {

  login$: Observable<string>;
  user$: Observable<User>;
  starred$: Observable<Repo[]>;
  starredPagination$: Observable<Pagination>;

  paramChangesSubscription: Subscription;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {
    this.login$ = getLogin(store);
    this.user$ = getUser(store);
    this.starred$ =  getStarred(store);
    this.starredPagination$ = getStarredPagination(store);
  }

  ngOnInit() {
    this.paramChangesSubscription = this.route.params.subscribe((params) => {
      this.store.dispatch({
        type: ActionTypes.USER_CHANGED,
        payload: params['login']
      });
    });
  }

  onLoadMore() {
    this.store.dispatch({
      type: ActionTypes.LOAD_MORE_STARRED
    });
  }

  ngOnDestroy() {
    this.paramChangesSubscription.unsubscribe();
  }

}
