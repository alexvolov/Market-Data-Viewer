import { Component, OnInit } from '@angular/core';

import { CurrenciesService } from '../../services/currencies.service';

//import { ChartsModule } from 'ng2-charts/ng2-charts';

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

    /////

    public lineChartData: Array<any> = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90],
        [32, 33, 56, 63, 22, 88, 77]
    ];
    public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public lineChartType: string = 'line';
    public lineChartOptions: any = {
        animation: false,
        responsive: true
    };

}