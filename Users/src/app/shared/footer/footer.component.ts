import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  yearNow: number;

  constructor() {
    this.yearNow = new Date().getFullYear();
  }

}
