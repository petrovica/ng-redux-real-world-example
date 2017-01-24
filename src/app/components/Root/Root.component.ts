import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'root',
  template: `<router-outlet></router-outlet>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RootComponent {

  constructor() {}

}
