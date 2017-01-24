import { EntityRepositoryService } from './../components/EntityRepository/EntityRepository.service';
import { Observable } from 'rxjs/Observable';
import { Schema } from 'normalizr';
import { Store, Action } from '@ngrx/store';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { camelizeKeys } from 'humps';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import AppState from '../state';

interface RequestConfig {
  types: string[];
  endpoint: string;
  // schema:
};

@Injectable()
export class GithubService {

  private static API_ROOT = 'https://api.github.com/';

  constructor(
    private store: Store<AppState>,
    private http: Http,
    private entityRepository: EntityRepositoryService
  ) {}

  getError(response: Response) {
    if (response) {
      const error = response.json();
      if (error && error.message) {
        return error.message;
      }
    }

    return 'Something bad happened';
  }

  getFullUrl(endpoint: string) {
    if (!endpoint.startsWith(GithubService.API_ROOT)) {
      return GithubService.API_ROOT + endpoint;
    } else {
      return endpoint;
    }
  }

  // Extracts the next page URL from Github API response.
  getNextPageUrl(response) {
    const link = response.headers.get('link');
    if (!link) {
      return null;
    }

    const nextLink = link.split(',').find(s => s.indexOf('rel="next"') > -1);
    if (!nextLink) {
      return null;
    }

    return nextLink.split(';')[0].slice(1, -1);
  }

  request(endpoint: string, payload: any, schema: Schema, successActionType: string, failureActionType: string) {
    return this.http
      .get(this.getFullUrl(endpoint))
      .map(response => (<Action>{
        type: successActionType,
        payload: Object.assign({}, payload, {
          response,
          nextPageUrl: this.getNextPageUrl(response),
          data: this.entityRepository.normalizeAndStore(camelizeKeys(response.json()), schema)
        })
      }))
      .catch(response => Observable.of(<Action>{
        type: failureActionType,
        payload: Object.assign({}, payload, {
          error: this.getError(response)
        })
      }));
  }

}
