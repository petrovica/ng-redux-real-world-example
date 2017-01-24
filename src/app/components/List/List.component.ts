import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ContentChild, TemplateRef } from '@angular/core';

import { Pagination } from './List.types';


@Component({
  selector: 'app-list',
  template: `
    <h2 *ngIf="isLoading">
      <i>{{loadingLabel || 'Loading...'}}</i>
    </h2>

    <h2 *ngIf="isEmpty && isLastPage">
      <i>Nothing here!</i>
    </h2>

    <template ngFor let-item [ngForOf]="items">
      <template [ngTemplateOutlet]="template" [ngOutletContext]="{ item: item }"></template>
    </template>

    <button
      *ngIf="isLoadButtonVisible"
      [style.fontSize]="'150%'"
      [disabled]="isLoading"
      (click)="onLoadMore()"
    >
      {{isLoading ? 'Loading...' : 'Load More'}}
    </button>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent {

  @ContentChild(TemplateRef) template: TemplateRef<any>;

  @Input() items: any[];
  @Input() pagination: Pagination = {
    isFetching: false,
    ids: [],
    nextPageUrl: '',
    pageCount: 0
  };

  @Input() loadingLabel: string;

  @Output() loadMore = new EventEmitter();

  constructor() {}

  get isEmpty() {
    return this.items.length === 0;
  }

  get isLastPage() {
    return this.pagination && !this.pagination.nextPageUrl;
  }

  get isLoading() {
    return this.pagination && this.pagination.isFetching;
  }

  get isLoadButtonVisible() {
    return this.pagination && this.pagination.pageCount > 0 && !this.isLastPage;
  }

  onLoadMore() {
    this.loadMore.emit();
  }

}
