import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-explore',
  template: `
    <div>
      <p>Type a username or repo full name and hit 'Go':</p>
      <input
        #exploreInput
        size="45"
        [value]="value"
        (keyup.enter)="onSubmit(exploreInput.value)"
      />
      <button (click)="onSubmit(exploreInput.value)">Go!</button>
    </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExploreComponent {

  @Input() value: string;
  @Output() submit = new EventEmitter<string>();

  constructor() {}

  onSubmit(value) {
    this.submit.emit(value);
  }

}
