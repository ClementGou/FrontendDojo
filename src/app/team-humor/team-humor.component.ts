import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-humor',
  templateUrl: './team-humor.component.html',
  styleUrls: ['../humors/humors.component.css']
//  le css est celui du component parent, afin de factoriser le style de team-humor et user-humor
})
export class TeamHumorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
