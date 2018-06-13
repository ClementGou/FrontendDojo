import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {Auth} from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // On utilise un behaviorSubject pour permettre à tous les souscriveurs
  // d'obtenir la valeur courante (un BehaviorSubject a toujours une valeur par défaut)
  observable = new BehaviorSubject<Auth>({isAuth: false, resp: -1});

  public authModel = new Auth();

  constructor(private http: HttpClient) {
    console.log('Constructor AuthenticationService');
  }

  //  On retourne le subject afin de laisser les autres composants
  // s'informer de l'état de l'authentification
  getAuthState() {
    return this.observable;
  }

  // Find if a user defined in forms exists in DB
  checkUserExistence(firstname, lastname, password) {
    const password64 = btoa(password);
    console.log('password64: ' + password64);

    this.http.get<Auth>('member/login/firstname/' + firstname + '/lastname/' + lastname + '/password/' + password64,
      {observe: 'response'}).subscribe(response => {
        if (response.status === 200) {
          this.observable.next({
            isAuth: true,
            resp: 200,
            id: response.body.id,
            firstname: response.body.firstname,
            lastname: response.body.lastname
          });
          this.authModel.id = this.observable.value.id;
          this.authModel.firstname = this.observable.value.firstname;
          this.authModel.lastname = this.observable.value.lastname;
          this.authModel.memberHumorLevel = this.observable.value.memberHumorLevel;
        } else {
          console.log(response.status + ' Utilisateur inconnu');
        }
        console.log(response);
        console.log(response.body);
      },
      (error) => {
        this.observable.next({isAuth: false, resp: 204});
        //, msgError : 'compte desactit'
        console.log('Erreur de connexion!: ' + error);
      }

      // TODO il faudra gérer les erreurs
    );
    // On retourne le subject afin de laisser les autres composants
    return this.observable;
  }


// checkUserExistence(firstname, lastname, password) {
//   // On mock / simule l'appel à un ws et on renvoie un succes apres 1 seconde
//   // en utilisant le subject
//   of({isAuth: true, resp: 200}).pipe( // TODO remettre la vrai requete http
//     delay(1000)
//   ).subscribe(
//     (authData) => {
//       this.observable.next(authData); // à conserver. et y souscrire
//     }
//     // TODO il faudra gérer les erreurs
//   );
//
//   // On retourne le subject afin de laisser les autres composants
//   return this.observable;
// }

  Disconnect() {
    this.observable.next({isAuth: false, resp: -1, id: null, firstname: null, lastname: null, password: null, memberHumorLevel: null});
  }


}
