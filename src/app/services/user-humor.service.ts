import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserHumorPostModel} from '../models/user-humor-post.model';
import {AuthenticationService} from './authentication.service';
import {BehaviorSubject} from 'rxjs';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserHumorService implements OnInit {

  // Subject booléen lié à l'existence en BD d'une humeur du jour pour l'utilisateur connecté
  private $userHumorExists = new BehaviorSubject<boolean>(false);
  // Subject ayant la valeur de l'humeur du jour de l'utilisateur
  private $userHumorLevel = new BehaviorSubject(null);

  constructor(private http: HttpClient, private authService: AuthenticationService) {
    console.log('Constructor UserHumorService');
  }

  ngOnInit() {
    console.log('ngOnInit userHumorService');
    // Affecter le booléen "false" à l'existence d'une humeur utilisateur
    this.$userHumorExists.next(false);
    // Récupérer l'humeur de l'utilisateur à l'initialisation (false/true)
    this.getUserHumor();
  }

  // Obtenir l'humeur du jour de l'utilisateur si elle existe en BD
  getUserHumor() {
    console.log('getUserHumor()');
    // Requête HTTP GET "memberHumor/{memberId}"
    this.http.get<User>('memberHumor/' + this.authService.getUserModel().id, {observe: 'response'}).subscribe(response => {
        // Si l'humeur du jour existe en base
        if (response.status === 200) {
          // Attribuer la valeur de l'humeur au UserModel
          this.authService.getUserModel().memberHumorLevel = response.body.memberHumorLevel;
          console.log('response.body.memberHumorLevel ' + response.body.memberHumorLevel);
          // Affecter la valeur de l'humeur au subject $userHumorLevel pour la rendre visible
          this.$userHumorLevel.next(response.body.memberHumorLevel);
          // Notifier que l'humeur existe en changeant le subject booléen à "true"
          this.$userHumorExists.next(true);
        }
        console.log(response.body);
        console.log(this.authService.getUserModel());
        console.log('$userHumorExists: ' + this.$userHumorExists.value);
      }
    );
  }

  // Enregistrer en base l'humeur du jour de l'utilisateur
  postUserHumor(humorValue) {
    console.log('postUserHumor(' + humorValue + ')');
    // Requête HTTP POST "memberHumor/today"
    this.http.post<UserHumorPostModel>('memberHumor/today', {
      // Remplir le body de la requête suivant le modèle UserHumorPostModel
      memberId: this.authService.getUserModel().id,
      day: null,
      memberHumorLevel: humorValue,
    }, {observe: 'response'}).subscribe(response => {
        // Si le POST de l'humeur est un succès
        if (response.status === 200) {
          // Ajouter au UserModel la valeur d'humeur
          this.authService.getUserModel().memberHumorLevel = humorValue;
          // Affecter la valeur de l'humeur au subject $userHumorLevel pour la rendre visible
          this.$userHumorLevel.next(humorValue);
          // Notifier que l'humeur existe en base en changeant le subject booléen à "true"
          this.$userHumorExists.next(true);
        }
        console.log(response.body);
        console.log('memberHumorLevel: ' + this.authService.getUserModel().memberHumorLevel);
        // Lancer la fonction de récupération de l'humeur précédemment ajoutée en base
        this.getUserHumor();
      }, (err) => console.error(err),
    );
  }

  get$userHumorExists() {
    console.log('get$userHumorExists()');
    return this.$userHumorExists;
  }

  get$userHumorLevel() {
    console.log('get$userHumorLevel()');
    return this.$userHumorLevel;
  }

  // Changer les valeurs des subjects pour correspondre à un état "non connecté". Fonction appelée par onDisconnect()
  Disconnect() {
    console.log('Disconnect()');
    this.$userHumorExists.next(false);
    this.$userHumorLevel.next(null);
  }
}
