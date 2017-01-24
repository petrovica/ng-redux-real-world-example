import { Store } from '@ngrx/store';

import AppState from './state';

export const getEntityRepository = (appStore: Store<AppState>) =>
  appStore.map(appState => appState.entityRepository).distinctUntilChanged();

export const getUser = (appStore: Store<AppState>) =>
  appStore.map(appState => appState.user).distinctUntilChanged();

export const getRepo = (appStore: Store<AppState>) =>
  appStore.map(appState => appState.repo).distinctUntilChanged();

export const getList = (appStore: Store<AppState>) =>
  appStore.map(appState => appState.list).distinctUntilChanged();

export const getStargazersPagination = (appStore: Store<AppState>) =>
  appStore.map(appState => appState.stargazersPagination).distinctUntilChanged();

export const getStarredPagination = (appStore: Store<AppState>) =>
  appStore.map(appState => appState.starredPagination).distinctUntilChanged();

export const getError = (appStore: Store<AppState>) =>
  appStore.map(appState => appState.error).distinctUntilChanged();
