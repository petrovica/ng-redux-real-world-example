import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-error',
  template: `
    <p *ngIf="message" style="background-color: #e99; padding: 10px">
      <b>{{message}}</b>
      (<a href="#" (click)="onDismiss(); $event.preventDefault()">Dismiss</a>)
    </p>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorMessageComponent {

  @Input() message: string;
  @Output() dismiss = new EventEmitter();

  constructor() {}

  onDismiss() {
    this.dismiss.emit();
  }

}
