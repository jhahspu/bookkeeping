import { Component, OnInit } from '@angular/core';

import { DbService } from '../../services/db.service';

import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  invForm = new FormGroup({
    invProduct: new FormControl(),
    invQty: new FormControl(),
    invPrice: new FormControl()
  });

  invoices: [];

  constructor(
    public dbService: DbService
  ) { }

  ngOnInit(): void {
    this.inventoryList();
  }

  btnInventory() {
    if (this.invForm.value.invProduct != null && this.invForm.value.invQty != null && this.invForm.value.invPrice != null) {
      this.dbService.addProduct(
        this.invForm.value.invProduct,
        this.invForm.value.invQty,
        this.invForm.value.invPrice
      );
      this.inventoryList();
    } else {
      alert('invalid form !');
    }
  }

  inventoryList(){
    if (localStorage.getItem('invoices')) {
      this.invoices = JSON.parse(localStorage.getItem('invoices'));
    }
  }

}
