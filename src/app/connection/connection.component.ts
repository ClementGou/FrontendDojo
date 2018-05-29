import {Component, Input, OnInit} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {User} from '../models/user.model';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})

export class ConnectionComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
  }

  login(form: NgForm) {

    const firstname = form.value['firstname'];
    const lastname = form.value['lastname'];
    const password = form.value['password'];

    this.authenticationService.checkUserExistence(firstname, lastname, password);
  }


  // login(firstname, lastname, password) {
  //   this.authenticationService.checkUserExistence(firstname, lastname, password);
  // }

  // TODO: A enlever quand terminé. Permet d'afficher le userModel
  // get diagnostic() { return JSON.stringify(this.userModel); }

}
