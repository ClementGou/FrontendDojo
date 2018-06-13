import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Auth} from '../models/auth.model';
import {UserHumorService} from '../services/user-humor.service';
import {Input} from '@angular/compiler/src/core';
import {log} from 'util';

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

  constructor(private userHumorService: UserHumorService,) {
    console.log('Constructor UserHumorComponent');
  }

  ngOnInit() {
    this.findUserHumor();
    this.userHumorService.$userHumorExists.subscribe(value => {
      this.userHumorExists = value;
      console.log('userHumorExists ' + value);
    });
    console.log('this.userHumorExists: ' + this.userHumorExists);
    this.userHumorService.$userHumorLevel.subscribe(value => {
      this.iconNumberUserHumor = value;
      console.log('iconNumberUserHumor ' + value);
    });
  }

  humorModal(number) {
    this.iconNumberModal = number;
    console.log('inconNumberModal: ' + this.iconNumberModal);
  }

  findUserHumor() {
    this.userHumorService.getUserHumor();
  }

  validateUserHumor() {
    this.userHumorService.postUserHumor(this.iconNumberModal);
  }
}
