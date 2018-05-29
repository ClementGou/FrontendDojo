import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-humors',
  templateUrl: './humors.component.html',
  styleUrls: ['./humors.component.css']
})
export class HumorsComponent implements OnInit {

  isAuth: boolean;

  constructor() {
  }

  ngOnInit() {
    this.isAuth = false;
  }

}
