import {Component, OnInit, SimpleChanges} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {AuthGardService} from '../services/auth-gard.service';
import {Router} from '@angular/router';
import {UserHumorService} from '../services/user-humor.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

// Component du header de l'appli
export class HeaderComponent implements OnInit {

  // Boolean permettant de gérer les affichages du header (Connection/Deconnection, informations utilisateur)
  protected isAuth = false;
  // Générer la date du jour
  protected date = new Date();

  constructor(private authenticationService: AuthenticationService, private userHumorService: UserHumorService, private authgardService: AuthGardService, public router: Router) {
    console.log('Constructor HeaderComponent');
  }

  ngOnInit() {
    console.log('ngOnInit()');
    // Souscrire à l'observable d'authentification pour gérer l'affichage des boutons Connection/Déconnection
    this.authgardService.getIsConnected().subscribe((boolean) => {
      if (boolean !== undefined) {
        this.isAuth = boolean;
      }
      console.log('isAuth = ' + this.isAuth);
    });
  }

  // Fonction de déconnection activée par un bouton du header
  onDisconnect() {
    console.log('onDisconnect()');
    // Effacer les paramètres de connection et les informations utilisateur
    this.authenticationService.Disconnect();
    this.userHumorService.Disconnect();
    // Redirection sur la page d'acceuil
    this.router.navigate(['/']);
  }
}

