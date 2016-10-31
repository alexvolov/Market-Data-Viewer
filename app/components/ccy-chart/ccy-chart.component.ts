import { Component, OnInit } from '@angular/core';

import { CurrenciesService } from '../../services/currencies.service';

@Component({
  selector: 'ccy-chart',
  templateUrl: './app/components/ccy-chart/ccy-chart.component.html',
  styleUrls: [ './app/components/ccy-chart/ccy-chart.component.css' ]
})
export class CcyChartComponent implements OnInit {

    public lineChartLegend:boolean = true;
    public lineChartType: string = 'line';
    public lineChartOptions: any = {
        animation: false,
        responsive: true
    };

    constructor(private currenciesService: CurrenciesService) { }

    onCcyChanged(code: string) {
        let from =  new Date();
        from.setDate(from.getDate() - 20);
        let to = new Date().toJSON().slice(0,10);
        this.currenciesService.loadHistoricalData(code, from.toJSON().slice(0,10), to);
    }

    ngOnInit() {
        let from =  new Date();
        from.setDate(from.getDate() - 20);
        let to = new Date().toJSON().slice(0,10);
        this.currenciesService.loadHistoricalData('RUB', from.toJSON().slice(0,10), to);
    }
    
}