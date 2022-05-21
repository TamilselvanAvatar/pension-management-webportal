import { Component, ErrorHandler, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GlobalComponent } from 'src/app/global.component';
import { PensionAllService } from 'src/app/pension-all-service.service';

@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.css'],
})
export class CalculationComponent implements OnInit {
  token = GlobalComponent.token;
  result = false;
  error = false;
  errorMessage = ``;
  bankServiceCharge: number;
  pensionAmount: number;

  constructor(private pensionService: PensionAllService) {}

  ngOnInit(): void {
    GlobalComponent.pensioner=undefined;
  }

  errorHandler(err) {
    this.error = true;
    if (err?.error?.error === true) {
      this.errorMessage = 'Aadhaar Number is not present in database';
    } else {
      this.errorMessage = 'Server Error';
    }
  }

  onSubmitAadhaar(aadhaar: NgForm) {
    let { aadhaarNumber } = aadhaar.form.value;
    if (!isNaN(aadhaarNumber) && String(aadhaarNumber).length == 12) {
      this.error = false;
      this.pensionService
        .getPensionDetails(this.token, aadhaarNumber)
        .subscribe(
          (data) => {
            this.bankServiceCharge = data.BankServiceCharge;
            this.pensionAmount = data.PensionAmount;

            this.pensionService
              .getPensionerDetails(this.token, aadhaarNumber)
              .subscribe(
                (data) => {
                  GlobalComponent.pensioner = data;
                },
                (err) => {
                  this.errorHandler(err);
                }
              );

            this.result = true;
          },
          (err) => {
            this.errorHandler(err);
          }
        );
    } else {
      this.error = true;
      this.errorMessage = `Aadhaar Number Should be 12 digit Number`;
    }
  }
}
