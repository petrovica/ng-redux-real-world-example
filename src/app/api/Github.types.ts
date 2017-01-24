export interface User {
  login: string;
  name: string;
  avatarUrl: string;
};

export interface NormalizedRepo {
  name: string;
  fullName: string;
  description: string;
  owner: string;
}

export interface Repo {
  name: string;
  fullName: string;
  description: string;
  owner: User;
}
