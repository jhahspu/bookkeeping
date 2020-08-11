import { Component, OnInit } from '@angular/core';

import { DbService } from '../../services/db.service';

import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.scss']
})
export class AccountingComponent implements OnInit {

  accForm = new FormGroup({
    accValue: new FormControl(),
    accDetail: new FormControl()
  });

  budget: number;
  transactions = [];

  constructor(private dbService: DbService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.budget = this.dbService.getBudget();
    this.transactions = this.dbService.getTransactions();
  }

  buttonTransaction() {
    if (this.accForm.value.accValue != null && this.accForm.value.accDetail != null) {
      let am = parseFloat(this.accForm.value.accValue);
      if (this.accForm.value.accDetail != 'deposit') {
        am = am * (-1);
      }
      let det = this.accForm.value.accDetail;
      this.dbService.makeTransaction(det, am);
      this.getData();
      this.accForm.reset();
    } else {
      alert('invalid form !');
    }
    
  }

}
