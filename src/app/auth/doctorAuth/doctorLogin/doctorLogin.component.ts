import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthDoctorUserService } from '../authDoctorUser.service';
import { MatSnackBar } from '@angular/material';
@Component({
  templateUrl: './doctorLogin.component.html',
  styleUrls: ['./doctorLogin.component.css']
})
export class DoctorLoginComponent{

  constructor(public authDoctorUserService : AuthDoctorUserService,private sankBar : MatSnackBar){}

  //Method of doctorsignupcomponent to check whether the docUser is valid or not
  onDoctorLogin(form:NgForm){
    if(form.invalid){
      this.sankBar.open("Please enter valid data", 'Close',{duration:3000});
      return;
    }
    this.sankBar.open("Logging... Please wait ", 'Close',{duration:3000});
    
    //For valid docUser calling authDocservice to check email and password for successful login
    this.authDoctorUserService.login(form.value.email,form.value.password);
  }

}
