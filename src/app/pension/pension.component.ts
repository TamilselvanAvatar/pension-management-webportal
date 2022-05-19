import { Component, OnInit } from '@angular/core';
import { GlobalComponent } from '../global.component';

@Component({
  selector: 'app-pension',
  templateUrl: './pension.component.html',
  styleUrls: ['./pension.component.css'],
})
export class PensionComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onSignOut() {
    GlobalComponent.pensioner = undefined;
    GlobalComponent.token = undefined;
  }
}
