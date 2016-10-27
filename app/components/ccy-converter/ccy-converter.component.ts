import { Component, OnInit } from '@angular/core';

import { CurrenciesService } from '../../services/currencies.service';

@Component({
  selector: 'ccy-converter',
  templateUrl: './app/components/ccy-converter/ccy-converter.component.html',
  styleUrls: [ './app/components/ccy-converter/ccy-converter.component.css' ]
})
export class CcyConverterComponent implements OnInit {
    constructor(private currenciesService: CurrenciesService) { }

    onAddCurrency(currency: string) {
      this.currenciesService.add(currency);
    }

    onUpdateRates() {
        this.currenciesService.loadRates();
    }

    ngOnInit() {
        this.currenciesService.loadRates();
    }

}