import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HumorsComponent} from '../humors/humors.component';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService implements OnInit {
  isAuth: boolean;

  resp: number;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.isAuth = false;
  }

  // Find if a user defined in forms exists in DB
  checkUserExistence(firstname, lastname, password) {

    this.http.get('member/login/firstname/' + firstname + '/lastname/' + lastname + '/password/' + password,
      {observe: 'response'}).subscribe(response => {
        if (response.status === 200) {
          console.log(response.status + ' utilisateur existant');
          this.isAuth = true;
          this.resp = 200;
        } else {
          console.log(response.status);
          console.log('Utilisateur inconnu');

        }
      },
      (error) => {
        console.log('Erreur de connexion!: ' + error);
      }
    );
    return this.resp;
  }

  Disconnect() {
  }


}
