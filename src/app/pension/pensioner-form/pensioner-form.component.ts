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

  pensionerDetails = new FormGroup({
    pensionerName: new FormControl(this.pensioner?.name, [
      Validators.required,
      Validators.minLength(4),
    ]),
    aadhaar: new FormControl(this.pensioner?.aadhaar, [
      Validators.required,
      Validators.minLength(12),
      Validators.maxLength(12),
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
      Validators.minLength(6),
      Validators.maxLength(15),
    ]),
    bankType: new FormControl(
      this.pensioner?.bankDetail?.bankType
        ? this.pensioner?.bankDetail?.bankType
        : 'PUBLIC'
    ),
  });

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
            console.log(data);
          },
          (err) => {
            console.log(err);
          }
        );
    }
    if (this.text === 'Update') {
      this.pensionService
        .updatePensionerDetails(GlobalComponent.token, this.pensioner)
        .subscribe(
          (data) => {
            console.log(data);
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }
}
