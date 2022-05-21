import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GlobalComponent } from 'src/app/global.component';
import { PensionAllService } from 'src/app/pension-all-service.service';

@Component({
  selector: 'app-delete-pensioner',
  templateUrl: './delete-pensioner.component.html',
  styleUrls: ['./delete-pensioner.component.css']
})
export class DeletePensionerComponent implements OnInit {

  message :string;
  enable:boolean;

  constructor(private pensionService: PensionAllService) { }

  ngOnInit(): void {
    this.message = ''
    this.enable = false
  }

  onDelete(aadhaar:NgForm){
    console.log(aadhaar)
    let number = aadhaar?.form?.value?.number
    if(String(number).length === 12){
      this.pensionService.deletePensionerDetails(GlobalComponent.token,number).subscribe((data)=>{
        if(data.message === 'Deleted'){
          this.message = "Successfully Deleted"
          this.enable = true;
        }
      } , (err)=>{
        if (err.status === 500 && err.statusText === "OK"){
          this.message = "Not Deleted ...."
        }
        else{
          this.message = "Server Error"
        }
      })
    }
    else{
      this.message = "Aadhaar Number Should be 12 digits"
    }
  }

}
