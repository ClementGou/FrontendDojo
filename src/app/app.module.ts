import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes, CanActivate } from '@angular/router';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {TeamHumorComponent} from './team-humor/team-humor.component';
import {UserHumorComponent} from './user-humor/user-humor.component';
import {ConnectionComponent} from './connection/connection.component';
import {HeaderComponent} from './header/header.component';
import {HumorsComponent} from './humors/humors.component';
import {AcceuilComponent} from './acceuil/acceuil.component';
import {AuthGardService} from './services/auth-gard.service';
import {AuthenticationService} from './services/authentication.service';
import {TeamHumorService} from './services/team-humor.service';
import {UserHumorService} from './services/user-humor.service';
import {API_URL, ApplicationInterceptor} from './application.interceptor';
import {environment} from '../environments/environment';
import { SafeHTMLPipe } from './pipes/safe-html.pipe';


const appRoutes: Routes = [
  {path: '', component: AcceuilComponent},
  {path: 'acceuil', component: AcceuilComponent},
  {path: 'connection', component: ConnectionComponent},
  {path: 'humors', canActivate: [AuthGardService], component: HumorsComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    TeamHumorComponent,
    UserHumorComponent,
    ConnectionComponent,
    HeaderComponent,
    HumorsComponent,
    AcceuilComponent,
    SafeHTMLPipe
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
