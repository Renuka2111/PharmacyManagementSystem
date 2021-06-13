import { MatSnackBar } from '@angular/material';
import { InventoryInteractionService } from './../../../a-inventory-window/inventory-interaction.service';
import { DoctorOderServices } from './../../../a-inventory-window/a-shopping-cart-window/DoctorOderServices.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-verified-doctor-order-item',
  templateUrl: './verified-doctor-order-item.component.html',
  styleUrls: ['./verified-doctor-order-item.component.css']
})
export class VerifiedDoctorOrderItemComponent implements OnInit {

  docOders: any[] = [];
  isLoading= false;

  docOderSubs: Subscription;

  constructor( private doctoderService: DoctorOderServices,
               private sankBar: MatSnackBar){}

  ngOnInit() {
    this.isLoading = true;
    this.doctoderService.getVerifiedDocOders();
    this.docOderSubs = this.doctoderService.getVerifiedDocOdersUpdateListener()
      .subscribe((posts) => {
        this.isLoading = false;
        this.docOders = posts;
      });
  }


  async onPickup(name:string,doctorContact:string,email:string,total:number,pickupDate:string,drugName:any[] = [],drugPrice:any[] = [],drugQuantity:any[] = [],id:string){

    let length = drugName.length;
    let quantity= 0;
    console.log(length);
    for (let count = 0 ; count < length; count++) {

      quantity= +drugQuantity[count];
    console.log(drugQuantity[count],quantity);
   }

    this.doctoderService.createPickedUpDoctorOder(name,doctorContact,email,total,pickupDate,drugName,drugPrice,drugQuantity);
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

    this.doctoderService.deleteVerifiedItem(id);
    this.sankBar.open("Order Pickedup!!", 'Close',{duration:3000});
    
  }
}
