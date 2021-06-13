import { Injectable } from '@angular/core';
import { Inventory } from './inventory.model';
import { Subject } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

const InventorySchema = '../../../../backend/models/inventory.js';
@Injectable({
  providedIn: 'root'
})

export class InventoryInteractionService {

  private inventory: Inventory[] = [];
  private inventoryUpdated = new Subject<Inventory[]>();
  
  private invetoraex=[];
  private inventoryUpdateaex= new Subject<any[]>();

  constructor(private http: HttpClient, private router : Router){}

  getInventory() {
    this.http.get<{message: string, inventorys: any}>('http://localhost:3002/api/inventory')
    .pipe(map(inventoryData => {
     return inventoryData.inventorys.map(inventory=>{
       return{
        email: inventory.email,
        name: inventory.name,
        quantity:inventory.quantity,
        batchId:inventory.batchId,
        expireDate: inventory.expireDate,
        price: inventory.price,
        id: inventory._id
       }
     })
    }))
    .subscribe((transformedInventory)=>{
      this.inventory = transformedInventory;
      this.inventoryUpdated.next([...this.inventory])
    });

  }

  getInventoryUpdateListener() {
    return this.inventoryUpdated.asObservable();
  }
  getInventoryAExUpdateListener(){
    return this.inventoryUpdateaex.asObservable();
  }

  getInventorys(id: string){
    return this.http.get<{_id: string, email: string  , name: string, quantity: string, batchId: string, expireDate: string, price:string }>
    ('http://localhost:3002/api/inventory/' + id);
  }

  addInventory( email: string, name: string, quantity: string, batchId: string, expireDate: string, price: string ) {
    const inventory: Inventory ={id: null,
                                  email:email ,
                                  name:name ,
                                  quantity: quantity,
                                  batchId: batchId ,
                                  expireDate: expireDate ,
                                  price: price
                                  };
    

    this.http.post<{message: string, id: string}>('http://localhost:3002/api/inventory',inventory)
    .subscribe((responseData)=>{
      const id=responseData.id;
      inventory.id =id;
      this.inventory.push(inventory);
      this.inventoryUpdated.next([...this.inventory]);
      this.router.navigate(["/inventory/create"]);
    });

  }

  updateInventory(id: string , email: string ,name: string, quantity: string, batchId: string, expireDate: string, price: string ){

    let inventoryData: Inventory | FormData;
       inventoryData  ={id : id ,
                        email : email ,
                        name : name ,
                        quantity : quantity ,
                        batchId : batchId ,
                        expireDate : expireDate ,
                        price: price,
                        };
    this.http
             .put('http://localhost:3002/api/inventory/' + id , inventoryData)
             .subscribe(response => {
               const updatedInventorys = [...this.inventory];
               const oldInventoryIndex = updatedInventorys.findIndex(i => i.id === id);

               const inventory : Inventory ={id : id ,
                                             email : email ,
                                             name : name ,
                                             quantity : quantity ,
                                             batchId : batchId ,
                                             expireDate : expireDate ,
                                             price: price,
                                             };
               updatedInventorys[oldInventoryIndex] = inventory;
               this.inventoryUpdated.next([...this.inventory]);
               this.router.navigate(["/inventory/create"]);
             });
  }

  deleteInventory(inventoryId: string) {
    this.http.delete('http://localhost:3002/api/inventory/' + inventoryId)
      .subscribe(() =>{
        const inventoryUpdated = this.inventory.filter(inventory => inventory.id !== inventoryId);
        this.inventory = inventoryUpdated;
        this.inventoryUpdated.next([...this.inventory])
      });
  }
}
