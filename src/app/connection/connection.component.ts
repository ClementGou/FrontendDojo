import {Component, Input, OnInit} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {User} from '../models/user.model';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {

test: string;
  constructor(private authenticationService: AuthenticationService, public router: Router) {
  }

  ngOnInit(): void {
  }

  login(form: NgForm) {

    const firstname = form.value['firstname'];
    const lastname = form.value['lastname'];
    const password = form.value['password'];

    // checkUserExistence renvoie un observable
    // il faut donc y souscrire afin d'être au courant des changements
    // lors d'un changement, on check le résultat de l'authenfication
    // et on route en fonction
    this.authenticationService.checkUserExistence(
      firstname, lastname, password).subscribe(authState => {
        console.log('authState', authState);
        if (authState && authState.isAuth) {
          this.router.navigate(['/humors']);
        } else {
          this.router.navigate(['/connection']);
        }
    });
        
  }


  // login(firstname, lastname, password) {
  //   this.authenticationService.checkUserExistence(firstname, lastname, password);
  // }

  // TODO: A enlever quand terminé. Permet d'afficher le userModel
  // get diagnostic() { return JSON.stringify(this.userModel); }

}
