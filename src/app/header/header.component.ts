import {Component, OnInit, SimpleChanges} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {AuthGardService} from '../services/auth-gard.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  protected isAuth = false;

  constructor(private authenticationService: AuthenticationService, private authgardService: AuthGardService, public router: Router) {
  }

  ngOnInit() {
    this.authgardService.isLoginObservable().subscribe((boolean) => {
      if (boolean !== undefined) {

        this.isAuth = boolean;
      }
      console.log('isAuth = ' + this.isAuth);
    });
  }

  giveToday() {
    const date = new Date();
    return date;
  }

  onDisconnect() {
    this.authenticationService.Disconnect();
    this.router.navigate(['/']);
  }
}

