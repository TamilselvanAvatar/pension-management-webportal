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
  errorMessage = '';
  message: boolean = false;
  visible: boolean = true;
  constructor(
    private router: Router,
    private authSerivice: PensionAllService
  ) {}

  ngOnInit(): void {
    this.params = window.location.pathname === '/register';
    this.type = this.params ? 'Submit' : 'Sign In';
  }

  onChangePassword(event: any) {
    let show = event.data != null ? 'visibility_off' : '';
    event.target.nextSibling.innerText = show;
  }

  onIconCkick(event: any) {
    let show = this.visible ? 'visibility' : 'visibility_off';
    let type = show === 'visibility' ? 'text' : 'password';
    event.srcElement.innerText = show;
    event.target.parentElement.children[1].attributes.type.value = type;
    this.visible = !this.visible;
  }

  onClickSubmit(loginUser: NgForm) {
    let { userId, password, confirmPassword } = loginUser.form.value;

    if (userId?.length > 3 && password?.length > 3 && this.type === 'Sign In') {
      this.authSerivice.gettoken(userId, password).subscribe(
        (token: string) => (GlobalComponent.token = token),
        (error) => {
          if (error.statusText == 'OK') {
            this.errorMessage = error?.error?.message;
          } else {
            this.errorMessage = 'Server Error';
          }
        }
      );
      GlobalComponent.token != '' && this.router.navigate(['/pension']);
    }

    if (
      userId?.length > 3 &&
      password != '' &&
      password === confirmPassword &&
      this.type === 'Submit'
    ) {
      this.authSerivice.doRegister(userId, password).subscribe(
        (data) => {
          if (data != undefined && data?.message === 'Register') {
            this.errorMessage = 'Successfully Registered';
            this.message = true;
          } else {
            this.errorMessage = 'User ID already taken ';
          }
        },
        (error) => {
          this.errorMessage = 'Server Error';
        }
      );
    }

    if (
      this.type === 'Submit' &&
      password?.length > 3 &&
      password != confirmPassword
    ) {
      this.errorMessage = 'Password should equal to Confirm Password ';
    }

    if (userId?.length <= 3 || password?.length <= 3) {
      this.errorMessage =
        'UserId and Password Should be greater than or equal 4 Characters';
    }

    if (userId === '' || password === '' || confirmPassword === '') {
      this.errorMessage = 'UserId and Password Should not empty';
    }

    setTimeout(() => {
      (this.errorMessage = ''), (this.message = false);
    }, 3000);
  }
}
