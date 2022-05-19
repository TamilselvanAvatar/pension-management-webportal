import { Component, OnInit } from '@angular/core';
import { PensionAllService } from './pension-all-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'pensionManagementUI';
  toggler = true;
  params = '';

  constructor(private pensionService: PensionAllService) {}

  ngOnInit(): void {}

  onTogglerChange(event: Array<any>) {
    this.toggler = event[0];
    this.params = event[1];
  }
}
