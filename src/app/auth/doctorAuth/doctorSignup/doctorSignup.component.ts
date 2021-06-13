import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthDoctorUserService } from '../authDoctorUser.service';
import {MatSnackBar} from '@angular/material'
@Component({
  templateUrl: './doctorSignup.component.html',
  styleUrls: ['./doctorSignup.component.css']
})
export class DoctorSignupComponent{

  constructor(public authDoctorUserService : AuthDoctorUserService,private sankBar : MatSnackBar){}

  onDoctorSignup(form:NgForm){

    if(form.invalid){
      return;
    }
    this.sankBar.open("Signup successful...Please Login to proceed",'Close',{duration:3000});
    this.authDoctorUserService.createDoctorUser(form.value.name, form.value.contact, form.value.email, form.value.password);

  }

}
