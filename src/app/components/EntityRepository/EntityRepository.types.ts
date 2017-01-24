import { User, Repo, NormalizedRepo } from '../../api/Github.types';

export type Users = {
  [login: string]: User;
};

export type NormalizedRepos = {
  [fullName: string]: NormalizedRepo;
};

export type Repos = {
  [fullName: string]: Repo;
};

export interface EntityRepositoryState {
  users: Users;
  repos: NormalizedRepos;
};
