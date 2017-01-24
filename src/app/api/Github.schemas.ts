import { schema } from 'normalizr';

export const USER = new schema.Entity('users', {}, {
  idAttribute: user => user.login.toLowerCase()
});

export const REPO = new schema.Entity('repos', {
  owner: USER
}, {
  idAttribute: repo => repo.fullName.toLowerCase()
});
