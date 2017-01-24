import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Component, ChangeDetectionStrategy } from '@angular/core';

import AppState from '../../state';
import * as ActionTypes from './ErrorMessage.actions';
import { getError } from './../../selectors';


@Component({
  selector: 'app-error-container',
  template: `<app-error [message]="message$ | async" (dismiss)="onDismiss()"></app-error>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorMessageContainerComponent {

  message$: Observable<string>;

  constructor(private store: Store<AppState>) {
    this.message$ = getError(this.store);
  }

  onDismiss() {
    this.store.dispatch({ type: ActionTypes.RESET_ERROR_MESSAGE });
  }

}
