import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {TeamHumorResponseModel} from '../models/team-humor-response.model';

@Injectable({
  providedIn: 'root'
})

export class TeamHumorService {

  // Subject servant à garder l'état de l'humeur moyenne de l'équipe lors de la requête GET TeamHumor
  private $observableTeamHumor = new BehaviorSubject<TeamHumorResponseModel>({teamHumorValue: 0, valuesNumber: 0});

  // Subject servant à garder la valeur de l'humeur d'équipe
  private $observableMembersNumber = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {
    console.log('Constructor TeamHumorService');
  }

  // Récupérer le nombre total d'utilisateurs enregistrés
  getMembersNumber() {
    console.log('getMembersNumber()');
    // Requete HTTP GET qui ramène le nombre d'utilisateurs enregistrés dans la table Member
    this.http.get<number>('member/countAllMembers').subscribe(data => {
        // Change l'état de l'observable avec le nombre récupéré
        this.$observableMembersNumber.next(data);
        console.log('Number of members: ' + data);
      }
    );
    return this.$observableMembersNumber;
  }

  // Récupére l'humeur moyenne et le nombr d'humeurs enregistrées pour le jour
  getTeamHumor() {
    console.log('updateTeamHumor()');
    // Requête HTTP GET "teamHumor" pour calculer l'humeur moyenne et compter le nombre d'humeurs du jour
    this.http.get<TeamHumorResponseModel>('teamHumor', {observe: 'response'}).subscribe(data => {
      if (data.status === 200) {
        // En cas de success, changer l'état de l'observable avec les paramètres de la réponse
        this.$observableTeamHumor.next({
          day: data.body.day,
          teamHumorText: data.body.teamHumorText,
          teamHumorValue: data.body.teamHumorValue,
          valuesNumber: data.body.valuesNumber
        });
        console.log(data);
        console.log(data.body);
      }
    });
    return this.$observableTeamHumor;
  }

  // Retourne l'observable contenant la réponse du GET TeamHumor
  get$observableTeamHumor() {
    console.log('get$observableTeamHumor()');
    return this.$observableTeamHumor;
  }

  // Retourne l'observable contenant le nombre d'humeurs du jour en base
  get$observableMembersNumber() {
    console.log('get$observableMembersNumber');
    return this.$observableMembersNumber;
  }
}
