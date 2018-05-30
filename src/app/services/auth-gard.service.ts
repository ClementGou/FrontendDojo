import { Injectable, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import {Router, CanActivate } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthGardService implements CanActivate {

  private connected: boolean = false;

  constructor(private authenticationService: AuthenticationService, public router: Router) {
    // On souscrit au service et on update l'état interne du guard en fonction
    this.authenticationService.getAuthState().subscribe(authState => {
      if (authState && authState.isAuth) {
        this.connected = true;
      } else {
        this.connected = false;
      }
    });
  }

  canActivate(): boolean {
    if (this.connected) {
      return true;
    } else {
      this.router.navigate(['connection']);
      return false;
    }
  }

}
