import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-humors',
  templateUrl: './humors.component.html',
  styleUrls: ['./humors.component.css']
})
export class HumorsComponent implements OnInit {

  authStatus: boolean;

  constructor(private authService: AuthenticationService) {
    console.log('Constructor HumorsComponent');
  }

  ngOnInit() {
    this.authStatus = false;

  }

}
