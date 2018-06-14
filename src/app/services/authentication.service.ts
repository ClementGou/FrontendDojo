import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {Auth} from '../models/auth.model';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // Subject sur le model Auth qui contient les paramètres d'authentification et d'accès
  private $isAuthObservable = new BehaviorSubject<Auth>({isAuth: false, resp: -1});
  // Instanciation d'un model Utilisateur pour contenir les informations de connection et d'humeur
  private userModel = new User();

  constructor(private http: HttpClient) {
    console.log('Constructor AuthenticationService');
  }

  // Retourner le subject afin de laisser les autres composants s'informer de l'état de l'authentification
  getAuthState() {
    console.log('getAuthState()');
    return this.$isAuthObservable;
  }

  // Vérifier si l'utilisateur existe en base lors de la connection
  getUserExistence(firstname, lastname, password) {
    console.log('getUserExistence()');
    // Convertir le password du formulaire en Base64 avant la requête
    const password64 = btoa(password);

    // Requete HTTP GET qui regarde en base si l'utilisateur est enregistré
    this.http.get<User>('member/login/firstname/' + firstname + '/lastname/' + lastname + '/password/' + password64,
      {observe: 'response'}).subscribe(response => {
        // Si l'utilisateur existe
        if (response.status === 200) {
          // On passe à l'observable les valeurs correspondant à l'état connecté
          this.$isAuthObservable.next({
            isAuth: true,
            resp: 200,
          });
          // On alimente le model User avec les différents paramètres de la réponse
          this.userModel.id = response.body.id;
          this.userModel.firstname = response.body.firstname;
          this.userModel.lastname = response.body.lastname;
        } else {
          console.log(response.status + ' Utilisateur inconnu');
        }
        console.log(response);
        console.log(response.body);
      },
      (error) => {
        this.$isAuthObservable.next({isAuth: false, resp: 204});
        console.log('Erreur de connexion!: ' + error);
      }
    );
    return this.$isAuthObservable;
  }

  //Retourne le model User
  getUserModel() {
    console.log('getUserModel()');
    return this.userModel;
  }

  // Changer les valeurs des subjects pour correspondre à un état "non connecté". Fonction appelée par onDisconnect()
  Disconnect() {
    console.log('Disconnect()');
    this.$isAuthObservable.next({
      isAuth: false,
      resp: -1,
    });
  }
}
