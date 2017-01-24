import { Routes } from '@angular/router';

import AppState from './state';
import { AppComponent } from './components/App/app.component';
import { UserContainerComponent } from './components/User/User.container';
import { RepoContainerComponent } from './components/Repo/Repo.container';


export const appRoutes: Routes = [
  { path: '', component: AppComponent, children: [
    { path: ':login', component: UserContainerComponent },
    { path: ':login/:name', component: RepoContainerComponent }
  ]}
];
