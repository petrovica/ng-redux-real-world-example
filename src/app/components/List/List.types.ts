export interface Pagination {
  isFetching: boolean;
  ids: string[];
  nextPageUrl: string;
  pageCount: number;
};

export interface ListState {
  [namespace: string]: Pagination;
};
