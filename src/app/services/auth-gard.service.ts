import {Injectable, OnInit} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {Router, CanActivate} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// Ce service va permettre de contrôler l'affichage de certaines page en fonction du statut Connecté/Déconnecté, grâce à l'implémentation de CanActivate
export class AuthGardService implements CanActivate {

  // Subject qui suivra le statut de connection de l'utilisateur
  private $isConnected = new BehaviorSubject<boolean>(false);

  constructor(private authenticationService: AuthenticationService, public router: Router) {
    console.log('Constructor AuthGardService');
    // On souscrit au service d'authentification et on update l'état interne du Subject $isConnected en fonction
    this.authenticationService.getAuthState().subscribe(authState => {
      if (authState && authState.isAuth) {
        this.$isConnected.next(true);
        console.log('AuthGard $isConnected: ' + this.$isConnected.value);
      } else {
        this.$isConnected.next(false);
        console.log('AuthGard $isConnected: ' + this.$isConnected.value);
      }
    });
  }

  // Fonction dont l'état varie en fonction de l'état Connecté/Déconnecté. Permet de controler quelles pages sont accessibles selon son état.
  canActivate(): boolean {
    console.log('canActivate()');
    // Si l'observable est true, alors canActivate() renvoie true et l'affichage de la page des humeurs est possible
    if (this.$isConnected.value === true) {
      return true;
    } else {
      // Sinon retour à la page de connexion
      this.router.navigate(['connection']);
      // Et les URL sous la contraintes de canActivate ne sont pas accessibles (cf appRoutes)
      return false;
    }
  }

  // Retourne l'observable $isConnected, pour le HeaderComponent en particulier
  getIsConnected() {
    console.log('getIsConnected()');
    return this.$isConnected;
  }
}
