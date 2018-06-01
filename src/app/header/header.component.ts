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
  isLoggedIn = new BehaviorSubject<boolean>(this.getIsAuth());

  private isAuth = false;


  constructor(private authenticationService: AuthenticationService, private authgardService: AuthGardService, public router: Router) {
  }

  ngOnInit() {
    this.authgardService.isLoginObservable().subscribe((boolean) => {
      if (boolean !== undefined) {

        this.isAuth = boolean;
      }
      // this.isLoggedIn.next(boolean);}
      console.log('boolean isLoggedIn de HeaderComponent = ' + this.isLoggedIn.value);
    });
  }

  // ngOnChanges (changes: SimpleChanges) {
  //   if (changes['isAuth'])
  // }

  giveToday() {
    const date = new Date();
    return date;
  }

  onDisconnect() {
    this.authenticationService.Disconnect();
    this.router.navigate(['/']);
  }

  private getIsAuth(): boolean {
    return this.isAuth;
  }
}

