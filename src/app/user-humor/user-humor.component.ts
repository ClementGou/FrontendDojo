import {Component, OnInit} from '@angular/core';
import {UserHumorService} from '../services/user-humor.service';

@Component({
  selector: 'app-user-humor',
  templateUrl: './user-humor.component.html',
  styleUrls: ['../humors/humors.component.css',
  ],
})

export class UserHumorComponent implements OnInit {

  protected iconNumberModal: number;
  protected iconNumberUserHumor: number;
  protected userHumorExists: boolean;

  constructor(private userHumorService: UserHumorService) {
    console.log('Constructor UserHumorComponent');
  }

  ngOnInit() {
    console.log('ngOnInit()');
    this.findUserHumor();
    this.userHumorService.$userHumorExists.subscribe(value => {
      this.userHumorExists = value;
      console.log('userHumorExists ' + value);
    });
    this.userHumorService.$userHumorLevel.subscribe(value => {
      this.iconNumberUserHumor = value;
      console.log('iconNumberUserHumor ' + value);
    });
  }

  humorModal(number) {
    console.log('humorModal(' + number + ')');
    this.iconNumberModal = number;
  }

  findUserHumor() {
    console.log('findUserHumor()');
    this.userHumorService.getUserHumor();
  }

  validateUserHumor() {
    console.log('validateUserHumor()');
    this.userHumorService.postUserHumor(this.iconNumberModal);
  }
}
