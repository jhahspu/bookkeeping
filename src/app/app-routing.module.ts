import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AccountingComponent } from './components/accounting/accounting.component';
import { InventoryComponent } from './components/inventory/inventory.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'accounting', component: AccountingComponent },
  { path: 'inventory', component: InventoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
