import {Component, OnInit} from '@angular/core';
import {UserHumorService} from '../services/user-humor.service';

@Component({
  selector: 'app-user-humor',
  templateUrl: './user-humor.component.html',
  styleUrls: ['../humors/humors.component.css',
  ],
})

export class UserHumorComponent implements OnInit {

  // Numéro de l'humeur choisie par l'utilisateur en cliquant sur l'icone
  protected iconNumberModal: number;
  // Booléen précisant si une humeur d'utilisateur existe en base
  protected userHumorExists: boolean;
  // Numéro correspondant à l'humeur de l'utilisateur existante en base
  protected iconNumberUserHumor: number;

  constructor(private userHumorService: UserHumorService) {
    console.log('Constructor UserHumorComponent');
  }

  ngOnInit() {
    console.log('ngOnInit()');
    // Appel au service pour récupérer l'humeur utilisateur en base
    this.userHumorService.getUserHumor();
    // Souscrire au Subject du service, qui rend un boolean selon l'existence de l'humeur en base
    this.userHumorService.get$userHumorExists().subscribe(boolean => {
      this.userHumorExists = boolean;
      console.log('userHumorExists ' + boolean);
    });
    // Souscrire au Subject du service, qui rend la valeur de l'humeur utilisateur de la base
    this.userHumorService.get$userHumorLevel().subscribe(number => {
      this.iconNumberUserHumor = number;
      console.log('iconNumberUserHumor ' + number);
    });
  }

  // Afficher dans le modal l'icone cliquée par l'utilisateur
  humorModal(number) {
    console.log('humorModal(' + number + ')');
    this.iconNumberModal = number;
  }

  // Appel au service pour poster l'humeur utilisateur en base
  validateUserHumor() {
    console.log('validateUserHumor()');
    this.userHumorService.postUserHumor(this.iconNumberModal);
  }
}
