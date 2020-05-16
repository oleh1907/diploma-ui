import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoginMode = true;

  error: string = null;

  constructor(private _authService: AuthService, private _router: Router) {}

  ngOnInit(): void {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const username = form.value.username;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObs = this._authService.login(username, password);
    } else {
      authObs = this._authService.signup(username, password);
    }
    authObs.subscribe(
      (resData) => {
        console.log(resData);
        this._router.navigate(['/analysis']);
      },
      (errorData) => {
        console.log(errorData);
        if (errorData.status == 401) {
          this.error = "Користувача з таким ім'ям та паролем не існує";
        } else if (errorData.status == 400) {
          this.error = "Користувач з таким ім'ям вже існує";
        }
      }
    );

    form.reset();
  }
}
