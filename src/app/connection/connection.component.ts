import {Component} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent {


  constructor(private authenticationService: AuthenticationService, public router: Router) {
    console.log('Constructor ConnectionComponent');
  }

  login(form: NgForm) {
    console.log('login(' + NgForm + ')');

    const firstname = form.value['firstname'];
    const lastname = form.value['lastname'];
    const password = form.value['password'];

    // checkUserExistence renvoie un $isAuthObservable
    // il faut donc y souscrire afin d'être au courant des changements
    // lors d'un changement, on check le résultat de l'authenfication
    // et on route en fonction
    this.authenticationService.checkUserExistence(
      firstname, lastname, password).subscribe(authState => {
      if (authState && authState.isAuth) {
        this.router.navigate(['/humors']);
      } else {
        this.router.navigate(['/connection']);
      }
    });
  }

  loginFooBar() {
    console.log('loginFooBar()');

    const firstname = 'Foo';
    const lastname = 'Bar';
    const password = 'pwd';

    this.authenticationService.checkUserExistence(
      firstname, lastname, password).subscribe(authState => {
      if (authState && authState.isAuth) {
        this.router.navigate(['/humors']);
      } else {
        this.router.navigate(['/connection']);
      }
    });
  }
}
