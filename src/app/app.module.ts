import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { ReactiveFormsModule } from '@angular/forms';

// Services
import { DbService } from './services/db.service';


//Components
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AccountingComponent } from './components/accounting/accounting.component';
import { InventoryComponent } from './components/inventory/inventory.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    AccountingComponent,
    InventoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    ReactiveFormsModule,

    
  ],
  providers: [DbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
