import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TeamHumorComponent } from './team-humor/team-humor.component';
import { UserHumorComponent } from './user-humor/user-humor.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { ConnectionComponent } from './auth/connection/connection.component';
import { HeaderComponent } from './header/header.component';
import { HumorsComponent } from './humors/humors.component';
import {AuthGardService} from './services/auth-gard.service';
import {AuthenticationService} from './services/authentication.service';
import {TeamHumorService} from './services/team-humor.service';
import {UserHumorService} from './services/user-humor.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';


const appRoutes: Routes = [
  { path: 'auth/connection', component: ConnectionComponent},
  { path: 'auth/registration', component: RegistrationComponent},
  { path: 'humors', component: HumorsComponent},
  { path: '', component: HumorsComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    TeamHumorComponent,
    UserHumorComponent,
    RegistrationComponent,
    ConnectionComponent,
    HeaderComponent,
    HumorsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthGardService,
    AuthenticationService,
    TeamHumorService,
    UserHumorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
