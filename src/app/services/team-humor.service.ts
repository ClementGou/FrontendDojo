import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {BehaviorSubject, observable} from 'rxjs';
import {TeamHumorResponseModel} from '../models/team-humor-response.model';

@Injectable({
  providedIn: 'root'
})

// interface qui servira a récupérer les données de la réponse JSON lors de la requête HTTP getTeamHumorHTTP


export class TeamHumorService {

  // On utilise un behaviorSubject pour permettre à tous les souscriveurs
  // d'obtenir la valeur courante (un BehaviorSubject a toujours une valeur par défaut)
  observable = new BehaviorSubject<TeamHumorResponseModel>({teamHumorValue: 0, valuesNumber: 0});

  // TODO tous les arguments ne sont pas définis ici, vérifier si les arguments day et teamHumorText peuvent être définis plus tard

  constructor(private http: HttpClient) {
    console.log('Constructor TeamHumorService');
  }

  //  On retourne le subject afin de laisser les autres composants
  // s'informer de l'état de l'authentification

  getTeamHumor() {
    return this.observable;
  }

  // Find if a user defined in forms exists in DB

  getTeamHumorHTTP() {
    console.log('getTeamHumorHTTP/2018-04-05');
    // TODO enlever date URL pour huhmeur du jour

    // this.http.get('teamHumor/2018-04-05', {observe: 'response'}).subscribe((body) => {
    this.http.get<TeamHumorResponseModel>('teamHumor/2018-04-05', {observe: 'response'}).subscribe(data => {
      if (data.status === 200) {
        this.observable.next({
          day: data.body.day,
          teamHumorText: data.body.teamHumorText,
          teamHumorValue: data.body.teamHumorValue,
          valuesNumber: data.body.valuesNumber
        });
      }
      console.log(data);
      console.log('day: ' + data.body.day);
      console.log('teamHumorValue: ' + data.body.teamHumorValue);
      console.log('teamHumorText: ' + data.body.teamHumorText);
      console.log('valuesNumber: ' + data.body.valuesNumber);
      console.log('observable: ' + this.observable.value.valuesNumber);
    });
    return this.observable;
  }
}
