import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isConnected = false;

  Connect() {
    // this.isConnected = true;
    return new Promise(
      (resolve, reject) => {
        this.isConnected = true;
        resolve(true);
      }
    );
  }

  Disconnect() {
    this.isConnected = false;
  }
}
