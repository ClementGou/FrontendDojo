import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HumorsCompoedenent} from '../humors/humors.component';

import {Observable} from 'rxjs';
import { of } from 'rxjs/internal/observable/of';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  constructor(private http: HttpClient, private humors: HumorsComponent) {
  }
isAuth: boolean;
const observ = Observable.of(42);

  // Find if a user defined in forms exists in DB
  checkUserExistence(firstname, lastname, password) {

    this.http.get('member/login/firstname/' + firstname + '/lastname/' + lastname + '/password/' + password,
      {observe: 'response'}).subscribe(response => {
        if (response.status === 200) {
          console.log(response.status + ' utilisateur existant');
        } else {
          console.log(response.status);
          console.log('Utilisateur inconnu');
        }
      },
      (error) => {
        console.log('Erreur de connexion!: ' + error);
      }
    );
  }

  Disconnect() {
    this.humors.isAuth = false;
  }


}
