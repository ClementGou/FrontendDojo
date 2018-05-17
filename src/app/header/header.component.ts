import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  authStatus: boolean;

  constructor(private authenticationService: AuthenticationService) {

  }

  ngOnInit() {
  }

  giveToday() {
    const date = new Date();
    return date;
  }

  onDisconnect() {
    this.authenticationService.Disconnect();
  }

  onConnect() {
    this.authenticationService.Connect().then(
      () => {
        this.authStatus = this.authenticationService.isConnected;
      }
    );
  }
}

