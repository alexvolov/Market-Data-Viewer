import { Component }    from '@angular/core';
import { ChartModule }            from 'angular2-highcharts'; 

@Component({
    selector: 'ccy-chart',
    styles: [`
      chart {
        display: block;
      }
    `],
    template: `<chart [options]="options"></chart>`
})
export class CcyChartComponent {
    
    options: Object;
    
    constructor() { 
        this.options = {
            title : { text : 'Rate History' },
            series: [{
                name: 'USD/GBP',
                data: [2,3,5,8,13]
            },{
                name: 'USD/RUB',
                data: [-2,-3,-5,-8,-13]
            }]
        };
    }
    
}
