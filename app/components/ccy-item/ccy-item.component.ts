import { Component, Input } from '@angular/core';

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
        this.currenciesService.delete(this.currency.code);
    }

    onAmountChange(amount: number) {
        this.currency.amount = amount;
        this.currenciesService.recalculateByCurrency(this.currency);
    }

}