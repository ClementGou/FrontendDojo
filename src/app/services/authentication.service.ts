import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HumorsComponent} from '../humors/humors.component';
import { BehaviorSubject } from 'rxjs';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Auth } from './auth.model';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // On utilise un behaviorSubject pour permettre à tous les souscriveurs
  // d'obtenir la valeur courante
  observable = new BehaviorSubject<Auth>({isAuth: false, resp: -1});

  constructor(private http: HttpClient) {}

  //  On retourne le subject afin de laisser les autres composants 
  // s'informer de l'état de l'authentification
  getAuthState() {
    return this.observable;
  }

  // Find if a user defined in forms exists in DB
  checkUserExistence(firstname, lastname, password) {
    // On mock / simule l'appel à un ws et on renvoie un succes apres 1 seconde
    // en utilisant le subject
    of({isAuth: true, resp: 200}).pipe( // TODO remettre la vrai requete http
      delay(1000)
    ).subscribe(
      (authData) => {
        this.observable.next(authData);
      }
      // TODO il faudra gérer les erreurs
    );

    // On retourne le subject afin de laisser les autres composants 
    return this.observable;
  }

  Disconnect() {
  }


}
