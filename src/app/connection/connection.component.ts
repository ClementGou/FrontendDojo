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

if (
  this.authenticationService.checkUserExistence(firstname, lastname, password) === 200){

    }
    this.router.navigateByUrl('../humors');
  }


  // login(firstname, lastname, password) {
  //   this.authenticationService.checkUserExistence(firstname, lastname, password);
  // }

  // TODO: A enlever quand terminé. Permet d'afficher le userModel
  // get diagnostic() { return JSON.stringify(this.userModel); }

}
