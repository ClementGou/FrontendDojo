import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserHumorPostModel} from '../models/user-humor-post.model';
import {Auth} from '../models/auth.model';
import {AuthenticationService} from './authentication.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {assertNumber} from '@angular/core/src/render3/assert';

@Injectable({
  providedIn: 'root'
})
export class UserHumorService implements OnInit {

  public $userHumorExists = new BehaviorSubject<boolean>(false);

  public $userHumorLevel = new BehaviorSubject(null);

  constructor(private http: HttpClient, private authService: AuthenticationService) {
    console.log('Constructor UserHumorService');
  }

  ngOnInit() {
    console.log('ngOnInit userHumorService');
    this.getUserHumor();
    this.$userHumorExists.next(false);
  }

  getUserHumor() {
    console.log('getUserHumor()');
    this.http.get<Auth>('memberHumor/' + this.authService.authModel.id, {observe: 'response'}).subscribe(response => {
        if (response.status === 200) {
          this.authService.authModel.memberHumorLevel = response.body.memberHumorLevel;
          this.$userHumorLevel.next(response.body.memberHumorLevel);
          this.$userHumorExists.next(true);
        }
        console.log(response.body);
        console.log(this.authService.authModel);
      }
    );
  }

  postUserHumor(humorValue) {
    console.log('postUserHumor(' + humorValue + ')');
    this.http.post<UserHumorPostModel>('memberHumor/today', {
      memberId: 2,
      date: null,
      memberHumorLevel: 3,
    }, {observe: 'response'}).subscribe(response => {
      if (response.status === 200) {
        console.log('PostUserHumor OK');
      }
      console.log(response.body);
    });
  }

  Disconnect() {
    this.$userHumorExists.next(false);
    this.$userHumorLevel.next(null);
  }
}
