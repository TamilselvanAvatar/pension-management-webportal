import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalComponent } from 'src/app/global.component';
import { PensionAllService } from 'src/app/pension-all-service.service';

@Component({
  selector: 'app-pensioner-form',
  templateUrl: './pensioner-form.component.html',
  styleUrls: ['./pensioner-form.component.css'],
})
export class PensionerFormComponent implements OnInit {
  bankName = ['IOB', 'CUB', 'ICICI', 'AXIS', 'SBI', 'HDFC'];

  bankType = ['PUBLIC', 'PRIVATE'];

  pensionType = ['SELF', 'FAMILY'];

  pensioner = GlobalComponent.pensioner;

  text: string;

  message: string;

  pensionerDetails = new FormGroup({
    pensionerName: new FormControl(this.pensioner?.name, [
      Validators.required,
      Validators.minLength(4),
    ]),
    aadhaar: new FormControl(this.pensioner?.aadhaar, [
      Validators.required,
      Validators.pattern(/\d{12}/)
    ]),
    dob: new FormControl(this.pensioner?.dob, [Validators.required]),
    salaryEarned: new FormControl(this.pensioner?.salaryEarned, [
      Validators.required,
    ]),
    allowances: new FormControl(this.pensioner?.allowances, [
      Validators.required,
    ]),
    typeofPension: new FormControl(
      this.pensioner?.typeofPension ? this.pensioner?.typeofPension : 'SELF'
    ),
    pan: new FormControl(this.pensioner?.pan, [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    bankName: new FormControl(
      this.pensioner?.bankDetail?.name
        ? this.pensioner?.bankDetail?.name
        : 'IOB'
    ),
    accountNumber: new FormControl(this.pensioner?.bankDetail?.accountNumber, [
      Validators.required,
      Validators.pattern(/\d{6,15}/),
    ]),
    bankType: new FormControl(
      this.pensioner?.bankDetail?.bankType
        ? this.pensioner?.bankDetail?.bankType
        : 'PUBLIC'
    ),
  });

  enable: boolean;

  constructor(private pensionService: PensionAllService) {}

  ngOnInit(): void {
    this.text = this.pensioner != undefined ? 'Update' : 'Save';
    this.bankName = this.pensioner?.bankDetail?.name
      ? [this.pensioner?.bankDetail?.name]
      : this.bankName;
  }


  onSubmit() {
    let { bankName, accountNumber, bankType, pensionerName } =
      this.pensionerDetails.value;
    let pensionerDetail = {
      ...this.pensionerDetails.value,
      name: pensionerName,
      bankDetail: { name: bankName, accountNumber, bankType },
    };
    delete pensionerDetail.bankName;
    delete pensionerDetail.accountNumber;
    delete pensionerDetail.bankType;
    delete pensionerDetail.pensionerName;
    this.pensioner = pensionerDetail;
    if (this.text === 'Save') {
      this.pensionService
        .savePensionerDetails(GlobalComponent.token, this.pensioner)
        .subscribe(
          (data) => {
            if (data.message === 'Saved') {
              this.message = 'Saved Pensioner Successfully';
              this.enable = true;
              setTimeout(()=>{this.enable = false,this.message = ''},10000)
            }
          },
          (err) => {
            if (err.status === 500 ) {
              this.message = 'Not Saved Pensioner ';
            }
            else{
              this.message = "Server Error"
            }
            setTimeout(()=>{this.message = ''},1000)
          }
        );
    }
    if (this.text === 'Update') {
      this.pensionService
        .updatePensionerDetails(GlobalComponent.token, this.pensioner)
        .subscribe(
          (data) => {
            if (data.message === 'Updated') {
              this.message = 'Updated Pensioner Successfully';
              this.enable = true;
              setTimeout(()=>{this.enable = false , this.message = ''},1000)
            }
          },
          (err) => {
            if (err.status === 500) {
              this.message = 'Not Updated Pensioner ';
            }
            else{
              this.message = "Server Error"
            }
            setTimeout(()=>{this.message = ''},1000)
          }
        );
    }
  }
}
