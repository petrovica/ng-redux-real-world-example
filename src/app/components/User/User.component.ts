import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { User } from '../../api/Github.types';


@Component({
  selector: 'app-user',
  template: `
    <div *ngIf="user" class="User">
      <a [routerLink]="['/', user.login]">
        <img [src]="user.avatarUrl" [alt]="user.login" width="72" height="72" />
        <h3>
          {{user.login}} <span *ngIf="user.name">({{user.name}})</span>
        </h3>
      </a>
    </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent {

  @Input() user: User;

  constructor() {}

}
