import {Component} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})

// Component de la page de connexion
export class ConnectionComponent {

  constructor(private authenticationService: AuthenticationService, public router: Router) {
    console.log('Constructor ConnectionComponent');
  }

  // Fonction liée au formulaire de connexion
  login(form: NgForm) {
    console.log('login(' + NgForm + ')');

    // Attribution des valeurs du formulaire à des variables
    const firstname = form.value['firstname'];
    const lastname = form.value['lastname'];
    const password = form.value['password'];

    // Appel au service pour vérifier l'existence de l'utilisateur en base
    this.authenticationService.getUserExistence(
      firstname, lastname, password).subscribe(authState => {
      if (authState && authState.isAuth) {
        // Si l'utilisateur existe, redirection la page des humeurs
        this.router.navigate(['/humors']);
      } else {
        // Si l'utilisateur n'existe pas, redirection sur la page de connection
        this.router.navigate(['/connection']);
      }
    });
  }

  // Connexion "rapide" de test
  loginFooBar() {
    console.log('loginFooBar()');

    const firstname = 'Foo';
    const lastname = 'Bar';
    const password = 'pwd';

    this.authenticationService.getUserExistence(
      firstname, lastname, password).subscribe(authState => {
      if (authState && authState.isAuth) {
        this.router.navigate(['/humors']);
      } else {
        this.router.navigate(['/connection']);
      }
    });
  }
}
