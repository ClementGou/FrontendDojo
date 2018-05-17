import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-humor',
  templateUrl: './user-humor.component.html',
  styleUrls: ['../humors/humors.component.css',
    './user-humor.component.html'
  ]
  //  le css ajouté est celui du component parent, afin de factoriser une partie du style de team-humor et user-humor
})
export class UserHumorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
