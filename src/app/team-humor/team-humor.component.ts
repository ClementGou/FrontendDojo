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

  // codes HTML correspondants aux emoticones des humeurs
  protected htmlHighEmoticon = '<i class="fa fa-smile-o fa-5x" style="color:green"" ></i>';
  protected htmlMediumEmoticon = '<i class="fa fa-meh-o fa-5x" style="color:gold"></i>';
  protected htmlLowEmoticon = '<i class="fa fa-frown-o fa-5x" style="color:red"></i>';
  protected htmlInterrogation = '<i class="fa fa-question fa-5x" style="color:black"></i>';

  //code html à afficher dans le DOM pour l'humeur de l'équipe
  //Par défaut: htmlInterrogation
  protected htmlHumorEmoticon = this.htmlInterrogation;

  //les valeurs récupérées de teamHumor HTTP Request (n'a pas d'usage pour le moment)
  protected valuesNumber = 0;
  protected teamHumorValue = 0;

  // TODO est-ce qu'il ne faudrait pas lui donner une valeur par défaut (0) pour afficher un point d'intérrogation?

  constructor(private teamHumorService: TeamHumorService) {
    console.log('Constuctor TeamHumorComponent');
  }

  ngOnInit() {
    this.teamHumorService.observable.subscribe((teamHumor) => {
      this.valuesNumber = teamHumor.valuesNumber;
      if (teamHumor.teamHumorValue === 1) {
        this.teamHumorValue = 1;
        this.htmlHumorEmoticon = this.htmlLowEmoticon;
      } else if (teamHumor.teamHumorValue === 2) {
        this.teamHumorValue = 2;
        this.htmlHumorEmoticon = this.htmlMediumEmoticon;
      } else if (teamHumor.teamHumorValue === 3) {
        this.teamHumorValue = 3;
        this.htmlHumorEmoticon = this.htmlHighEmoticon;
      }
    });
  }

  // Cette méthode est utilisée par le bouton temporaire GetTeamHumor
  getTeamHumor() {
    this.teamHumorService.getTeamHumorHTTP();
  }
}
