import { ErrorMessageContainerComponent } from './components/ErrorMessage/ErrorMessage.container';
import { ErrorMessageComponent } from './components/ErrorMessage/ErrorMessage.component';
import { RouterStoreModule } from '@ngrx/router-store';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { effects } from './effects';
import reducers from './reducers';
import { appRoutes } from './routes';
import { EntityRepositoryService } from './components/EntityRepository/EntityRepository.service';
import { GithubService } from './api/Github.service';
import { ListComponent } from './components/List/List.component';
import { RootComponent } from './components/Root/Root.component';
import { AppComponent } from './components/App/app.component';
import { ExploreComponent } from './components/Explore/Explore.component';
import { ExploreContainerComponent } from './components/Explore/Explore.container';
import { UserComponent } from './components/User/User.component';
import { UserContainerComponent } from './components/User/User.container';
import { RepoComponent } from './components/Repo/Repo.component';
import { RepoContainerComponent } from './components/Repo/Repo.container';


@NgModule({
  declarations: [
    RootComponent,
    AppComponent,
    ExploreComponent,
    ExploreContainerComponent,
    UserComponent,
    UserContainerComponent,
    RepoComponent,
    RepoContainerComponent,
    ListComponent,
    ErrorMessageComponent,
    ErrorMessageContainerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    StoreModule.provideStore(reducers),
    RouterStoreModule.connectRouter(),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    ...effects,
  ],
  providers: [
    EntityRepositoryService,
    GithubService
  ],
  bootstrap: [RootComponent]
})
export class AppModule { }
