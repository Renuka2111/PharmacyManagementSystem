import { AuthService } from './../auth.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
   templateUrl: './signup.component.html',
   styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(public authService : AuthService,private sankBar : MatSnackBar){}

  onSignup(form:  NgForm){

    if(form.invalid){
      return;
    }
    console.log(form.value.role)
    this.sankBar.open("Signup successful...Please Login to proceed",'Close',{duration:3000});
    this.authService.createUser(form.value.name,form.value.contact,form.value.email,form.value.password);
    
  };

};
