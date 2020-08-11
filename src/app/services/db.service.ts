import { Injectable } from '@angular/core';

import { Transaction } from '../interfaces/transaction';
import { Inventory } from '../interfaces/inventory';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor() {}

  getBudget() {
    if (localStorage.getItem('budget')) {
      return parseFloat(JSON.parse(localStorage.getItem('budget')));
    } else {
      return 0;
    }
  }
  getTransactions() {
    if (localStorage.getItem('transactions')) {
      let transactions: [] = JSON.parse(localStorage.getItem('transactions'));
      return transactions;
    }
  }



  updateBudget(amount: number) {
    if (localStorage.getItem('budget')) {
      let newBudget = parseFloat(JSON.parse(localStorage.getItem('budget'))) + amount;
      localStorage.setItem('budget', JSON.stringify(newBudget));
      return newBudget;
    } else {
      localStorage.setItem('budget', JSON.stringify(amount));
      return amount;
    }
  }

  makeTransaction(detail: string, amount: number) {
    let budget = this.updateBudget(amount);

    const tempTransaction: Transaction = {
      date: new Date().toLocaleString(),
      value: amount,
      detail: detail,
      oValue: budget - amount,
      nValue: budget
    }

    let transactions = [];
    if (localStorage.getItem('transactions')) {
      transactions = JSON.parse(localStorage.getItem('transactions'));
      transactions.push(tempTransaction);
      localStorage.setItem('transactions', JSON.stringify(transactions));
    } else {
      transactions.push(tempTransaction);
      localStorage.setItem('transactions', JSON.stringify(transactions));
    }
  }

  addProduct(pname: string, qty: number, pprice: number) {
    let amount = pprice * qty * -1;
    this.makeTransaction('invoice', amount);

    const tempInvoice: Inventory = {
      date: new Date().toLocaleString(),
      prod: pname,
      qty: qty,
      aqty: qty,
      pprice: pprice,
      pvalue: pprice * qty,
      sprice: pprice *1.2,
      svalue: pprice * 1.2 * qty 
    }

    let invoices = [];
    if (localStorage.getItem('invoices')) {
      invoices = JSON.parse(localStorage.getItem('invoices'));
      invoices.push(tempInvoice);
      localStorage.setItem('invoices', JSON.stringify(invoices));
    } else {
      invoices.push(tempInvoice);
      localStorage.setItem('invoices', JSON.stringify(invoices));
    }
  }


}
