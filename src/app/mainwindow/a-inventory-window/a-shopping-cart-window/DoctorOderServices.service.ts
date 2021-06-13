import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class DoctorOderServices{
  private docOders:any[] = [];
  private docOdersUpdated = new Subject<any[]>();
  private VerifiedDocOders:any[] = [];
  private VerifiedDocOdersUpdated = new Subject<any[]>();
  private PickedUpDocOders:any[] = [];
  private PickedUpDocOdersUpdated = new Subject<any[]>();

  constructor(private http: HttpClient, private router: Router){
  }

  createDoctorUser(doctorName: string , doctorContact: string ,doctorEmail: string ,drugName: Array<any> = [],drugPrice: Array<any> = [] ,drugQuantity: Array<any> = [] ,totalAmount: number,pickupDate: string){
    const DoctorOderData  = {doctorName:doctorName ,
                            doctorContact:doctorContact ,
                            doctorEmail:doctorEmail ,
                            drugName:drugName ,
                            drugPrice:drugPrice,
                            drugQuantity:drugQuantity,
                            totalAmount:totalAmount,
                            pickupDate:pickupDate};
    this.http.post("http://localhost:3001/api/doctorOrder",DoctorOderData)
      .subscribe(response =>{
        console.log(response);
      });

  }

  createVerifiedDoctorOder(doctorName: string, doctorContact: string, doctorEmail: string,totalAmount: number,pickupDate: string,drugName: Array<any> = [],drugPrice: Array<any> = [] ,drugQuantity: Array<any> = [] ){
    const VerifiedDoctorOderData  = {doctorName:doctorName ,
                            doctorContact:doctorContact ,                           
                            doctorEmail:doctorEmail ,
                            drugName:drugName ,
                            drugPrice:drugPrice,
                            drugQuantity:drugQuantity,
                            totalAmount:totalAmount,
                            pickupDate:pickupDate};
    this.http.post("http://localhost:3001/api/verifiedDoctorOrder",VerifiedDoctorOderData)
      .subscribe(response =>{
        console.log(response);
      });

  }

  createPickedUpDoctorOder(doctorName: string,doctorContact: string,doctorEmail: string,totalAmount: number,pickupDate: string, drugName: Array<any> = [],drugPrice: Array<any> = [] ,drugQuantity: Array<any> = [] ){
    const PickedUpDoctorOderData  = {doctorName:doctorName ,
                            doctorContact:doctorContact ,
                            doctorEmail:doctorEmail ,
                            drugName:drugName ,
                            drugPrice:drugPrice,
                            drugQuantity:drugQuantity,
                            totalAmount:totalAmount,
                            pickupDate:pickupDate};
    this.http.post("http://localhost:3001/api/pickedUpOrders",PickedUpDoctorOderData)
      .subscribe(response =>{
        console.log(response);
      });

  }

  getDocOders() {
    this.http.get<{message: string, doctorOders: any}>("http://localhost:3001/api/doctorOrder")
    .pipe(map(docOderData => {
     return docOderData.doctorOders.map(doctorOder => {
       return{
        doctorName : doctorOder.doctorName ,
        doctorContact : doctorOder.doctorContact ,
        doctorEmail : doctorOder.doctorEmail ,
        drugName : doctorOder.drugNames ,
        drugPrice : doctorOder.drugPrice,
        drugQuantity : doctorOder.drugQuantity,
        totalAmount : doctorOder.totalAmount,
        pickupDate : doctorOder.pickupDate,
        id: doctorOder._id
       }
     })
    }))
    .subscribe((transformedDocOders)=>{
      this.docOders = transformedDocOders;
      this.docOdersUpdated.next([...this.docOders])
    });

  }

  getDocOdersUpdateListener() {
    return this.docOdersUpdated.asObservable();
  }

  getVerifiedDocOders() {
    this.http.get<{message: string, doctorOders: any}>("http://localhost:3001/api/verifiedDoctorOrder")
    .pipe(map(docOderData => {
     return docOderData.doctorOders.map(doctorOder => {
       return{
        doctorName : doctorOder.doctorName ,
        doctorContact : doctorOder.doctorContact ,
        doctorEmail : doctorOder.doctorEmail ,
        drugName : doctorOder.drugNames ,
        drugPrice : doctorOder.drugPrice,
        drugQuantity : doctorOder.drugQuantity,
        totalAmount : doctorOder.totalAmount,
        pickupDate : doctorOder.pickupDate,
        id: doctorOder._id
       }
     })
    }))
    .subscribe((transformedDocOders)=>{
      this.VerifiedDocOders = transformedDocOders;
      this.VerifiedDocOdersUpdated.next([...this.VerifiedDocOders])
    });
  }

  getVerifiedDocOdersUpdateListener() {
    return this.VerifiedDocOdersUpdated.asObservable();
  }


  getPickedUpDocOders() {
    this.http.get<{message: string, doctorOders: any}>("http://localhost:3001/api/pickedUpOrders")
    .pipe(map(docOderData => {
     return docOderData.doctorOders.map(doctorOder => {
       return{
        doctorName : doctorOder.doctorName ,
        doctorContact : doctorOder.doctorContact ,
        doctorEmail : doctorOder.doctorEmail ,
        drugName : doctorOder.drugNames ,
        drugPrice : doctorOder.drugPrice,
        drugQuantity : doctorOder.drugQuantity,
        totalAmount : doctorOder.totalAmount,
        pickupDate : doctorOder.pickupDate,
        acctualDate : doctorOder.dateTime,
        id: doctorOder._id
       }
     })
    }))
    .subscribe((transformedPickedUpDocOders)=>{
      this.PickedUpDocOders = transformedPickedUpDocOders;
      this.PickedUpDocOdersUpdated.next([...this.PickedUpDocOders])
    });
  }

  getPickedUpDocOdersUpdateListener() {
    return this.PickedUpDocOdersUpdated.asObservable();
  }

  deleteItem(oderId: string) {
    this.http.delete('http://localhost:3001/api/doctorOrder/' + oderId)
      .subscribe(() =>{
        const inventoryUpdated = this.docOders.filter(order => order.id !== oderId);
        this.docOders = inventoryUpdated;
        this.docOdersUpdated.next([...this.docOders])
      });
  }

  deleteVerifiedItem(oderId: string) {
    this.http.delete('http://localhost:3001/api/verifiedDoctorOrder/' + oderId)
      .subscribe(() =>{
        const inventoryUpdated = this.docOders.filter(order => order.id !== oderId);
        this.docOders = inventoryUpdated;
        this.docOdersUpdated.next([...this.docOders])
      });
  }

}
