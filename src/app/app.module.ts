import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {TeamHumorComponent} from './team-humor/team-humor.component';
import {UserHumorComponent} from './user-humor/user-humor.component';
import {ConnectionComponent} from './connection/connection.component';
import {HeaderComponent} from './header/header.component';
import {HumorsComponent} from './humors/humors.component';
import {AuthGardService} from './services/auth-gard.service';
import {AuthenticationService} from './services/authentication.service';
import {TeamHumorService} from './services/team-humor.service';
import {UserHumorService} from './services/user-humor.service';
import {API_URL, ApplicationInterceptor} from './application.interceptor';
import {environment} from '../environments/environment';



const appRoutes: Routes = [
  {path: 'connection', component: ConnectionComponent},
  {path: 'humors', component: HumorsComponent},
  {path: '', component: HumorsComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    TeamHumorComponent,
    UserHumorComponent,
    ConnectionComponent,
    HeaderComponent,
    HumorsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFontAwesomeModule,
    HttpClientModule,


  ],
  providers: [
    AuthGardService,
    AuthenticationService,
    TeamHumorService,
    UserHumorService,
    AppComponent,
    {provide: API_URL, useValue: environment.apiUrl},
    {provide: HTTP_INTERCEPTORS, useClass: ApplicationInterceptor, multi: true, deps:[API_URL]}
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
