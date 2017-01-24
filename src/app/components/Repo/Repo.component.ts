import { User, Repo } from './../../api/Github.types';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-repo',
  template: `
    <div class="Repo">
      <h3>
        <a [routerLink]="['/', repo.owner.login, repo.name]">{{repo.name}}</a>
        by
        <a [routerLink]="['/', repo.owner.login]">{{repo.owner.login}}</a>
      </h3>
      <p *ngIf="repo.description">{{repo.description}}</p>
    </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RepoComponent {

  @Input() repo: Repo;

  constructor() {}

}
