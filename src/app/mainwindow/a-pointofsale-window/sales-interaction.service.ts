import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import {Sales} from './sales.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SalesInteractionService {

  private sales = [];
  private salesUpdated = new Subject<Sales[]>();

  constructor(private http: HttpClient, private router : Router){}

  addSales( drugName: Array<any> =[], totalPrice: number, paidAmount: number, balance: number) {
    const sales = {id: null,
                                drugName: drugName,
                                totalPrice: totalPrice,
                                paidAmount: paidAmount,
                                balance:balance,
                                dateTime:null
                               };
    this.http.post<{message: string, salesId: string}>('http://localhost:3002/api/sales',sales)
    .subscribe((responseData)=>{
      const id = responseData.salesId;
      sales.id =id;
      this.sales.push(sales);
      this.salesUpdated.next([...this.sales]);
    });

  }

  getSales() {
    this.http.get<{message: string, sales: any}>('http://localhost:3002/api/sales')
    .pipe(map(salesData => {
     return salesData.sales.map(sales=>{
       return{
        drugName: sales.drugName,
        dateTime: sales.dateTime,
        totalPrice: sales.totalPrice,
        paidAmount: sales.paidAmount,
        balance: sales.balance,
        id:sales._id,
       }
     })
    }))
    .subscribe((transformedSales)=>{
      this.sales = transformedSales;
      this.salesUpdated.next([...this.sales])
    });

  }

  getSalesUpdateListener() {
    return this.salesUpdated.asObservable();
    
  }
}
