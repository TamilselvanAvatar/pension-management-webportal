import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GlobalComponent } from '../global.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @Output()
  toggler: EventEmitter<Array<any>> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onClickMember() {
    this.toggler.emit([false, 'Member']);
  }

  onClickLogin() {
    this.toggler.emit([false, 'Login']);
  }
}
