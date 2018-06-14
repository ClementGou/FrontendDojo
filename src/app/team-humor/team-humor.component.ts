import {Component, OnInit} from '@angular/core';
import {TeamHumorService} from '../services/team-humor.service';
import {UserHumorService} from '../services/user-humor.service';

@Component({
  selector: 'app-team-humor',
  templateUrl: './team-humor.component.html',
  styleUrls: ['../humors/humors.component.css']
//  le css est celui du component parent, afin de factoriser le style de team-humor et user-humor
})
// Component gérant l'affichage de l'humeur de l'équipe et du compteur d'utilisateurs
export class TeamHumorComponent implements OnInit {

  // Le nombre d'humeurs enregistrées en base
  protected valuesNumber = 0;
  // La valeur de l'humeur moyenne
  protected teamHumorValue = 0;
  // Le nombre de membres enregistrés en base
  protected membersNumber = 0;

  constructor(private teamHumorService: TeamHumorService, private userHumorService: UserHumorService) {
    console.log('Constructor TeamHumorComponent');
  }

  ngOnInit() {
    console.log('ngOnInit()');
    // Demander au service de calculer l'humeur moyenne et le nombre de membres
    this.teamHumorService.getTeamHumor();
    this.teamHumorService.getMembersNumber();

    // Souscrire à l'observable du service rendant la moyenne des humeurs de l'équipe
    this.teamHumorService.get$observableTeamHumor().subscribe((teamHumor) => {
      this.valuesNumber = teamHumor.valuesNumber;
      if (teamHumor.teamHumorValue === 1) {
        this.teamHumorValue = 1;
      } else if (teamHumor.teamHumorValue === 2) {
        this.teamHumorValue = 2;
      } else if (teamHumor.teamHumorValue === 3) {
        this.teamHumorValue = 3;
      }
    });

    // Souscrire au nombre de membres enregistrés en base
    this.teamHumorService.get$observableMembersNumber().subscribe((membersNumber) => {
      this.membersNumber = membersNumber;
    });

    // Souscrire à l'ajout d'une humeur par l'utilisateur
    this.userHumorService.get$userHumorExists().subscribe(boolean => {
      if (boolean === true) {
        this.updateTeamHumor();
      }
    });
  }

  // Update de l'humeur d'équipe ainsi que le nombre d'humeurs enregistrées, utilisé lorsque l'utilisateur ajoute une humeur
  updateTeamHumor() {
    console.log('getteamHumor()');
    this.teamHumorService.getTeamHumor();
    this.teamHumorService.getMembersNumber();
  }
}
