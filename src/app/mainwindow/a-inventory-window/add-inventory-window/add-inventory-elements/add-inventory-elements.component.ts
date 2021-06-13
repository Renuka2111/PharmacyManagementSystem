import { MatSnackBar } from '@angular/material';
import {  FormGroup, FormControl, Validators } from '@angular/forms';
import { InventoryInteractionService } from './../../inventory-interaction.service';
import { Inventory } from './../../inventory.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-add-inventory-elements',
  templateUrl: './add-inventory-elements.component.html',
  styleUrls: ['./add-inventory-elements.component.css']
})
export class AddInventoryElementsComponent implements OnInit {
  enteredEmail = "";
  enteredName = "";
  enteredQuantity = "";
  enteredBatchId = "";
  enteredExpireDate = "";
  enteredPrice = "";

  inventory : Inventory ;
  isLoading = false;
  form: FormGroup;
  private mode = "create";
  private inventoryId : string;


  constructor(private inventoryInteractionService: InventoryInteractionService, public route: ActivatedRoute , private snackBar: MatSnackBar){}

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null,{validators: [Validators.required, Validators.minLength(1),Validators.pattern("[^ @]*@[^ @]*"),emailDomainValidator]}),
      'name': new FormControl(null,{validators: [Validators.required, Validators.minLength(1)]}),
      'quantity': new FormControl(null,{validators: [Validators.required, Validators.minLength(1)]}),
      'batchId': new FormControl(null,{validators: [Validators.required, Validators.minLength(1)]}),
      'expireDate': new FormControl(null,{validators: [Validators.required, Validators.minLength(1)]}),
      'price': new FormControl(null,{validators: [Validators.required, Validators.minLength(1)]})
      
    });
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if (paramMap.has('inventoryId')){
        this.mode = "edit";
        this.inventoryId = paramMap.get('inventoryId');
        this.isLoading = true;
        this.inventoryInteractionService.getInventorys(this.inventoryId).subscribe(inventoryData =>{
        this.isLoading = false;
        this.inventory = {id:inventoryData._id,
                           email: inventoryData.email,
                           name: inventoryData.name,
                           quantity : inventoryData.quantity,
                           batchId: inventoryData.batchId,
                           expireDate: inventoryData.expireDate,
                           price: inventoryData.price,
                           
                          };
        this.form.setValue({'email':this.inventory.email ,
                            'name':this.inventory.name ,
                            'quantity':this.inventory.quantity ,
                            'batchId':this.inventory.batchId ,
                            'expireDate':this.inventory.expireDate,
                            'price':this.inventory.price
                             });
        });
      }else{
        this.mode = "create";
        this.inventoryId = null;
      }
    })
  }

  get registerFormControl() {
    return this.form.controls;
  }
  
  onAddInventory() {
    if (this.form.invalid) {
      return;
    }

    if(this.mode === "create"){
      this.inventoryInteractionService.addInventory(this.form.value.email,this.form.value.name,
        this.form.value.quantity,
        this.form.value.batchId,
        this.form.value.expireDate,
        this.form.value.price,
        );

        this.snackBar.open("Drug Added Successfully", "Close",{duration:3000});
    }else{
      this.inventoryInteractionService.updateInventory(this.inventoryId,this.form.value.email,this.form.value.name,
        this.form.value.quantity,
        this.form.value.batchId,
        this.form.value.expireDate,
        this.form.value.price,
        );

        this.snackBar.open("Drug Edited Successfully", "Close" ,{duration:3000});
    }

    this.form.reset();
  } 
}
function emailDomainValidator(control: FormControl) { (1)
  let email = control.value; (2)
  if (email && email.indexOf("@") != -1) { (3)
    let [_, domain] = email.split("@"); (4)
    if (domain !== "gmail.com") { (5)
      return {
        emailDomain: {
          parsedDomain: domain
        }
      }
    }
  }
  return null; (6)
}