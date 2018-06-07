import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {BehaviorSubject} from 'rxjs';
import {TeamHumorResponseModel} from '../models/team-humor-response.model';

@Injectable({
  providedIn: 'root'
})

// interface qui servira a récupérer les données de la réponse JSON lors de la requête HTTP getTeamHumorHTTP


export class TeamHumorService {

  // On utilise un behaviorSubject pour permettre à tous les souscriveurs
  // d'obtenir la valeur courante (NB: un BehaviorSubject a toujours une valeur par défaut)
  observableTeamHumor = new BehaviorSubject<TeamHumorResponseModel>({teamHumorValue: 0, valuesNumber: 0});

  observableMembersNumber = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {
    console.log('Constructor TeamHumorService');
  }

  // Find if a user defined in forms exists in DB
  getMembersNumber() {
    this.http.get<number>('member/countAllMember').subscribe(data => {
        this.observableMembersNumber.next(data);
      }
    );
    return this.observableMembersNumber;
  }

  getTeamHumorHTTP() {
    // TODO enlever date URL pour huhmeur du jour
    this.http.get<TeamHumorResponseModel>('teamHumor/2018-04-05', {observe: 'response'}).subscribe(data => {
      if (data.status === 200) {
        this.observableTeamHumor.next({
          day: data.body.day,
          teamHumorText: data.body.teamHumorText,
          teamHumorValue: data.body.teamHumorValue,
          valuesNumber: data.body.valuesNumber
        });
      }
    });
    return this.observableTeamHumor;
  }
}
