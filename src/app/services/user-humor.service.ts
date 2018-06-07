import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserHumorService {

  constructor(private http: HttpClient) { }

  // postUserHumor(){
  //   this.http.post()
  // }
}
