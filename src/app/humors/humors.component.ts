import {Component} from '@angular/core';

@Component({
  selector: 'app-humors',
  templateUrl: './humors.component.html',
  styleUrls: ['./humors.component.css']
})
// Component de la page principal (Header, TeamHumor, UserHumor)
export class HumorsComponent {

  constructor() {
    console.log('Constructor HumorsComponent');
  }
}
