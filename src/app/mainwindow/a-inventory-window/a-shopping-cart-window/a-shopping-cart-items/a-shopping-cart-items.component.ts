import { AuthDoctorData } from './../../../../auth/doctorAuth/doctorAuth-model';
import { AuthDoctorUserService } from './../../../../auth/doctorAuth/authDoctorUser.service';
import { NgForm } from '@angular/forms';
import { InventoryInteractionService } from './../../inventory-interaction.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Inventory } from '../../inventory.model';
import { DoctorOderServices } from '../DoctorOderServices.service';
import {MatSnackBar} from '@angular/material'
@Component({
  selector: 'app-a-shopping-cart-items',
  templateUrl: './a-shopping-cart-items.component.html',
  styleUrls: ['./a-shopping-cart-items.component.css']
})
export class AShoppingCartItemsComponent implements OnInit {
  
  searchTerm: string;
  inventorys: Inventory[] = [];
  itemArray: Array<any> =[];
  isLoading= false;
  total : number;
  private inventorySubs: Subscription;
  itemNumber: number;
  dataArray: Array<any> =[];
  details: AuthDoctorData;
  doc: string;
  currentUser: AuthDoctorData;
  currentUserSubscription: Subscription;
  users: AuthDoctorData[] = [];
  doctors: Array<any> = [];
  TrimedDoctors: Array<any> = [];
  docArrLength: number;
  oderDetail: Array<any> = [];
  drugNames: Array<any> = [];
  drugPrices: Array<any> = [];
  drugQuantities: Array<any> = [];

  name: string;
  userIsAuthenticated =false;
  private authListenerSubs: Subscription;

  constructor(private inventoryInteractionService: InventoryInteractionService, private authDoctorUserService:AuthDoctorUserService, private doctorOderService:DoctorOderServices, private sankBar:MatSnackBar) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.inventoryInteractionService.getInventory();
    this.inventorySubs = this.inventoryInteractionService.getInventoryUpdateListener()
      .subscribe((posts: Inventory[]) => {
        this.isLoading = false;
        this.inventorys = posts;
      });

    this.userIsAuthenticated = this.authDoctorUserService.getIsAuth();
    this.authListenerSubs = this.authDoctorUserService.getAuthStatusListener()
    .subscribe(isAuthenticated =>{
      this.userIsAuthenticated= isAuthenticated;
    });

    this.authDoctorUserService.getDoctors();

    this.doctors = this.authDoctorUserService.getDoctors();
    this.docArrLength = this.doctors.length;
    this.TrimedDoctors = this.doctors[this.docArrLength-1];
    console.log(this.TrimedDoctors);

  }

  ngOnDestroy() {
    this.inventorySubs.unsubscribe();
  }

  onAddToCart(itemId:string, name:string , expireDate:string ,price:string, form:NgForm){
    this.itemArray.push([itemId,name,expireDate,price,form.value.quantityNumber]);
    this.drugNames.push(name);
    this.drugPrices.push(price);
    this.drugQuantities.push(form.value.quantityNumber);
    console.log(this.itemArray);
    this.itemNumber = this.itemArray.length;

    let length = this.itemArray.length;
    let x ;
    let z ;
    let sum;
    this.total = 0;

    for (let count = 0 ; count < length; count++) {
       x = this.itemArray[count][3];

       z = this.itemArray[count][4];
       sum = +x * +z ;

       this.total = this.total + sum;

    }
    return this.total;
  }


  onCheckout(checkoutForm:NgForm){
    this.oderDetail.push(this.TrimedDoctors,this.itemArray,this.total,checkoutForm.value.pickupDateInput);
    console.log(this.oderDetail);

    let doctorName = this.TrimedDoctors[0];
    let doctorContact = this.TrimedDoctors[1];
    let doctorEmail = this.TrimedDoctors[2];
    let drugName = this.drugNames;
    let drugPrice = this.drugPrices;
    let drugQuantity = this.drugQuantities;
    let totalAmount = this.total;
    let pickupDate = checkoutForm.value.pickupDateInput;
    console.log(drugName);
    this.doctorOderService.createDoctorUser(doctorName,doctorContact,doctorEmail,drugName,drugPrice,drugQuantity,totalAmount,pickupDate)
    this.sankBar.open("Order placed successfully!!",'Close',{duration:3000});
  }

  onLogout(){
    this.authDoctorUserService.logout();
  }

}
