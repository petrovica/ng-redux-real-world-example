import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import 'rxjs/add/operator/take';

import AppState from '../../state';
import * as ActionTypes from './Explore.actions';

@Component({
  selector: 'app-explore-container',
  template: `
    <app-explore
      [value]="url"
      (submit)="onSubmit($event)"
    ></app-explore>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExploreContainerComponent {

  url: string;

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {
    this.url = router.url.startsWith('/') ? router.url.substr(1) : router.url;
  }

  onSubmit(value: string) {
    this.store.dispatch({
      type: ActionTypes.EXPLORE,
      payload: value
    });
  }

}
