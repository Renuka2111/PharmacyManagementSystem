import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';
import { DoctorOderServices } from './../../../a-inventory-window/a-shopping-cart-window/DoctorOderServices.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-doctor-order-item',
  templateUrl: './new-doctor-order-item.component.html',
  styleUrls: ['./new-doctor-order-item.component.css']
})
export class NewDoctorOrderItemComponent implements OnInit {

  docOders: any[] = [];
  isLoading= false;

  docOderSubs: Subscription;

  constructor(private doctoderService: DoctorOderServices, private sankBar : MatSnackBar){}

  ngOnInit() {
    this.isLoading = true;
    this.doctoderService.getDocOders();
    this.docOderSubs = this.doctoderService.getDocOdersUpdateListener()
      .subscribe((posts) => {
        this.isLoading = false;
        this.docOders = posts;
      });
  }

  onOderVerify(name:string,doctorContact:string,email:string,total:number,pickupDate:string, drugName:any[] = [],drugPrice:any[] = [],drugQuantity:any[] = [],id:string){

    this.doctoderService.createVerifiedDoctorOder(name,doctorContact,email,total,pickupDate,drugName,drugPrice,drugQuantity,);

    let user={
      name : name,
      email : email,
      total : total,
      pickupDate : pickupDate,
      drugName : drugName,
      drugPrice : drugPrice,
      drugQuantity : drugQuantity
    }
    console.log(user);

    this.doctoderService.deleteItem(id);
    this.sankBar.open("Order verified!!", 'Close',{duration:3000});
  }

}


