import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HumeurEquipeComponent } from './team-humor/humeur-equipe.component';
import { MonHumeurJourComponent } from './user-humor/mon-humeur-jour.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { ConnectionComponent } from './auth/connection/connection.component';
import { HeaderComponent } from './header/header.component';
import {AuthGardService} from './services/auth-gard.service';
import {AuthenticationService} from './services/authentication.service';
import {TeamHumorService} from './services/team-humor.service';
import {UserHumorService} from './services/user-humor.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HumeurEquipeComponent,
    MonHumeurJourComponent,
    RegistrationComponent,
    ConnectionComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
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
