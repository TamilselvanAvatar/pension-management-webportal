import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GlobalComponent } from 'src/app/global.component';
import { PensionAllService } from 'src/app/pension-all-service.service';

@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.css']
})
export class CalculationComponent implements OnInit {
  token = GlobalComponent.token;
  result=false
  error=false
  errorMessage = ``
  bankServiceCharge:number
  pensionAmount:number

  constructor(private pensionService : PensionAllService){}

  ngOnInit(): void {
  }

  onSubmitAadhaar(aadhaar:NgForm){
    let {aadhaarNumber} = aadhaar.form.value
    if(!(isNaN(aadhaarNumber)) && String(aadhaarNumber).length == 12){
      this.error = false
      this.pensionService.getPensionDetails(this.token,aadhaarNumber).subscribe( (data) => {
          console.log(data)
          this.bankServiceCharge = data.BankServiceCharge
          this.pensionAmount = data.PensionAmount
      } , (err)=>{
        console.log(err)
        if(err.error.error){
          this.error = true
          this.errorMessage = "Aadhaar Number is not present in database"
        }
      }) ;

      this.pensionService.getPensionerDetails(this.token,aadhaarNumber).subscribe(data=>{
        console.log(data)
        GlobalComponent.pensioner = data
      })
      this.result = true
    }  
    else{
      this.error = true  
      this.errorMessage = `Aadhaar Number Should be 12 digit Number`       
    }
  }

}
