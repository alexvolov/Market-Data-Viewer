import { Component } from '@angular/core';

import { CurrenciesService } from '../../services/currencies.service';
import { Currency } from '../../vo/currency';

@Component({
  selector: 'ccy-list',
  templateUrl: './app/components/ccy-list/ccy-list.component.html',
  styleUrls: [ './app/components/ccy-list/ccy-list.component.css' ]
})
export class CcyListComponent {
    
    constructor(private currenciesService: CurrenciesService) { }

}