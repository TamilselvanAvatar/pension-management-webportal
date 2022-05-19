import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { exit } from 'process';
import { GlobalComponent } from '../global.component';
import { PensionAllService } from '../pension-all-service.service';

@Component({
  selector: 'app-login-detail',
  templateUrl: './login-detail.component.html',
  styleUrls: ['./login-detail.component.css'],
})
export class LoginDetailComponent implements OnInit {
  params = false;
  type = 'Sign In';
  errorMessage = ""
  message: boolean = false;
  constructor(
    private router: Router,
    private authSerivice: PensionAllService
  ) {}

  ngOnInit(): void {
    this.params = window.location.pathname === '/register';
    this.type = this.params ? 'Submit' : 'Sign In';
  }
  onClickSubmit(loginUser: NgForm) {
    let { userId, password, confirmPassword } = loginUser.form.value;
    let disabled = !(password?.length < 4 || userId?.length < 4 )

    if (confirmPassword == undefined && this.type === "Sign In" ) {
      disabled && this.authSerivice
        .gettoken(userId, password)
        .subscribe((token: string) => (GlobalComponent.token = token) , (error) => {
           this.errorMessage = error?.message
           if(error.statusText == "OK"){
            this.errorMessage= error?.error?.message
           }
          });
        !disabled && (this.errorMessage = " UserId or Password Should not empty " );
      ( GlobalComponent.token != "" &&  this.router.navigate(['/pension']) );
    }
    if (confirmPassword != undefined && this.type === "Submit" ){
      this.message=false
      
      if(password != confirmPassword){
        this.errorMessage = "Password should equal to Confirm Password "
      }
      else{
        disabled && confirmPassword.length >= 4 && this.authSerivice.doRegister(userId, password).subscribe((data)=>{
         if(data != undefined){
          this.errorMessage = "Successfully Registered"
          this.message=true;
         }
        },(error)=>{
          console.log(error)
          if(error?.error?.message === "Not Register"){
            this.errorMessage = "User ID already taken "
          }
        })
        !disabled && confirmPassword.length < 4 && (this.errorMessage = " UserId and Password Should not empty and length greater than or equal 4" );
  
      }
    }

    

  }
}
