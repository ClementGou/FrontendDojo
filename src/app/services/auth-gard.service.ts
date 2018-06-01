import {Injectable, OnInit} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {Router, CanActivate} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGardService implements CanActivate {

  private connected: boolean = false;

  isLoginSubject = new BehaviorSubject<boolean>(this.connected);


  constructor(private authenticationService: AuthenticationService, public router: Router) {
    console.log('Constructor AuthGardService');

    // On souscrit au service et on update l'état interne du guard en fonction
    this.authenticationService.getAuthState().subscribe(authState => {
      if (authState && authState.isAuth) {
        this.connected = true;
        this.isLoginSubject.next(true);
        console.log('AuthGard isLoginSubject = ' + this.isLoginSubject.value);
      } else {
        this.connected = false;
        this.isLoginSubject.next(false);
        console.log('AuthGard isLoginSubject = ' + this.isLoginSubject.value);
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


  // TODO vérifier si fonction utile pour HeaderComponent. Est-il possible de souscrire directement au BehaviourSubject?
  isLoginObservable(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }




}
