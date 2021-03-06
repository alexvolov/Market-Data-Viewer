import { Component, Input, ViewChild } from '@angular/core';

import { CurrenciesService } from '../../services/currencies.service';
import { Currency } from '../../vo/currency';

@Component({
  selector: 'ccy-item',
  templateUrl: './app/components/ccy-item/ccy-item.component.html',
  styleUrls: [ './app/components/ccy-item/ccy-item.component.css' ]
})
export class CcyItemComponent {
    
    @Input() currency: Currency;

    constructor(private currenciesService: CurrenciesService) { }

    onDeleteCcy() {
        if (this.currency.code != "USD") {
            this.currenciesService.delete(this.currency);
        } else {

        }
    }

    onAmountChange(amount: number) {
        this.currency.amount = amount;
        this.currenciesService.recalculateByCurrency(this.currency);
    }

}