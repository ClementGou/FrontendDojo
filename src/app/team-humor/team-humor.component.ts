import {Component, OnInit} from '@angular/core';
import {TeamHumorService} from '../services/team-humor.service';
import {observable} from 'rxjs';

@Component({
  selector: 'app-team-humor',
  templateUrl: './team-humor.component.html',
  styleUrls: ['../humors/humors.component.css']
//  le css est celui du component parent, afin de factoriser le style de team-humor et user-humor
})
export class TeamHumorComponent implements OnInit {

  //les valeurs récupérées de teamHumor HTTP Request
  protected valuesNumber = 0;
  protected teamHumorValue = 0;

  constructor(private teamHumorService: TeamHumorService) {
    console.log('Constuctor TeamHumorComponent');
  }

  ngOnInit() {
    this.teamHumorService.observable.subscribe((teamHumor) => {
      this.valuesNumber = teamHumor.valuesNumber;
      if (teamHumor.teamHumorValue === 1) {
        this.teamHumorValue = 1;
      } else if (teamHumor.teamHumorValue === 2) {
        this.teamHumorValue = 2;
      } else if (teamHumor.teamHumorValue === 3) {
        this.teamHumorValue = 3;
      }
    });
  }

  // Cette méthode est utilisée par le bouton temporaire GetTeamHumor
  getTeamHumor() {
    this.teamHumorService.getTeamHumorHTTP();
  }
}
