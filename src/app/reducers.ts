import { routerReducer as router } from '@ngrx/router-store';

import entityRepository from './components/EntityRepository/EntityRepository.reducer';
import { userReducer as user, starredPaginationReducer as starredPagination } from './components/User/User.reducer';
import { repoReducer as repo, stargazersPaginationReducer as stargazersPagination } from './components/Repo/Repo.reducer';
import error from './components/ErrorMessage/ErrorMessage.reducer';

export default {
  router,
  entityRepository,
  user,
  repo,
  error,
  stargazersPagination,
  starredPagination
};
