import { Component, OnInit } from '@angular/core';

import { DbService } from '../../services/db.service';

import { FormControl, FormGroup } from '@angular/forms';

import { Inventory } from '../../interfaces/inventory';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  recForm = new FormGroup({
    recProduct: new FormControl(),
    recQty: new FormControl(),
    recPrice: new FormControl()
  });

  invoices : [];
  
  constructor(
    public dbService: DbService
  ) { }

  ngOnInit(): void {
    this.productList();
  }

  productList() {
    if (localStorage.getItem('invoices')) {
      this.invoices = JSON.parse(localStorage.getItem('invoices'));
    }
  }

  btnReceipt() {
    if (this.recForm.value.recProduct != null && this.recForm.value.recQty != null && this.recForm.value.recPrice != null) {
      
      let prodIndex = this.invoices.findIndex((p : Inventory) => p.prod == this.recForm.value.recProduct);
      
      const newInvoices = [...this.invoices];

      newInvoices[prodIndex].aqty -= this.recForm.value.recQty;

      this.dbService.makeTransaction('sale', this.recForm.value.recPrice * this.recForm.value.recQty);
      localStorage.setItem('invoices', JSON.stringify(newInvoices));

      this.productList();

      this.recForm.reset();
      
    } else {
      alert('invalid form !');
    }
    
  }
  

}
