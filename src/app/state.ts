import { RouterState } from '@ngrx/router-store';

import { EntityRepositoryState } from './components/EntityRepository/EntityRepository.types';
import { ListState } from './components/List/List.types';
import { UserState } from './components/User/User.types';
import { RepoState } from './components/Repo/Repo.types';
import { ErrorMessageState } from './components/ErrorMessage/ErrorMessage.types';

interface AppState {
  router: RouterState;
  entityRepository: EntityRepositoryState;
  user: UserState;
  repo: RepoState;
  list: ListState;
  stargazersPagination: ListState;
  starredPagination: ListState;
  error: ErrorMessageState;
};

export default AppState;
