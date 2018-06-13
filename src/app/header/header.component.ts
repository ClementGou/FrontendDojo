import {Component, OnInit, SimpleChanges} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {AuthGardService} from '../services/auth-gard.service';
import {Router} from '@angular/router';
import {UserHumorService} from '../services/user-humor.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  protected isAuth = false;

  constructor(private authenticationService: AuthenticationService, private userHumorService: UserHumorService, private authgardService: AuthGardService, public router: Router) {
    console.log('Constructor HeaderComponent');
  }

  ngOnInit() {
    console.log('ngOnInit()');
    this.authgardService.isLoginObservable().subscribe((boolean) => {
      if (boolean !== undefined) {
        this.isAuth = boolean;
      }
      console.log('isAuth = ' + this.isAuth);
    });
  }

  giveToday() {
    console.log('giveToday()');
    const date = new Date();
    return date;
  }

  onDisconnect() {
    console.log('onDisconnect()');
    this.authenticationService.Disconnect();
    this.userHumorService.Disconnect();
    this.router.navigate(['/']);
  }
}

