import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <app-explore-container></app-explore-container>
      <hr />
      <app-error-container></app-error-container>
      <router-outlet></router-outlet>
    </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  constructor() {}

}
