import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';

import { CurrenciesService } from './services/currencies.service';
import { AppComponent }   from './app.component';
import { CcyConverterComponent } from './components/ccy-converter/ccy-converter.component';
import { CcyListComponent } from './components/ccy-list/ccy-list.component';
import { CcyItemComponent } from './components/ccy-item/ccy-item.component';

@NgModule({
  imports:      [ BrowserModule, HttpModule, JsonpModule ],
  declarations: [ AppComponent, CcyConverterComponent, CcyListComponent, CcyItemComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [ CurrenciesService ]
})
export class AppModule { }
