import { AuthService } from './../auth.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(public authService : AuthService, private sankBar : MatSnackBar){}

  onLogin(form:  NgForm){
    if(form.invalid){
      this.sankBar.open("Please enter valid data", 'Close',{duration:3000});
      return;

    }
    this.sankBar.open("Logging... Please wait ", 'Close',{duration:3000});
    this.authService.login(form.value.email,form.value.password);
  };

};
