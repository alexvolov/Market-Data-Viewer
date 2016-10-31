import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Currency } from '../vo/currency';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class CurrenciesService {

    private url: string = 'http://query.yahooapis.com/v1/public/yql';
    private params: string = '&env=store://datatables.org/alltableswithkeys&format=json';

    public currencies: Currency[];
    public ratesHistory;
    public isLoading: boolean;

    constructor(private http: Http) {
        this.currencies = [{ code: 'USD', usdRate: 1, amount: 1 }, 
                           { code: 'RUB', usdRate: 1, amount: 1 }, 
                           { code: 'BGN', usdRate: 1, amount: 1 }, 
                           { code: 'EUR', usdRate: 1, amount: 1 }, 
                           { code: 'CAD', usdRate: 1, amount: 1 }, 
                           { code: 'GBP', usdRate: 1, amount: 1 }, 
                           { code: 'HKD', usdRate: 1, amount: 1 }, 
                           { code: 'SGD', usdRate: 1, amount: 1 }
                        ];
        this.isLoading = true;
    }

    add(ccyCode: string) {
        if (ccyCode != undefined && ccyCode != '') {
            let ccy = this.getCurrencyByCode(ccyCode);
            let index = this.currencies.indexOf(ccy, 0);
            if (index === -1) {
                this.currencies.push(new Currency(ccyCode, 0, 0));
                this.loadRates();
            }
        }
    }

    delete(ccy: Currency) {
        let index = this.currencies.indexOf(ccy, 0);
        if (index > -1 && ccy.code != "USD") {
            this.currencies.splice(index, 1);
        }
    }

    recalculateByCurrency(ccy: Currency) {
        if (null === ccy) {
            ccy = this.getCurrencyByCode("USD");
        }
        let usdAmount = (ccy.amount / ccy.usdRate).toFixed(3);
        for (let c of this.currencies) {
            if (c.code != ccy.code) {
                c.amount = parseFloat((parseFloat(usdAmount) * c.usdRate).toFixed(3));
            }
        }
    }

    loadRates() {
        this.isLoading = true;
        let yql: string = 'select * from yahoo.finance.xchange where pair in (' + this.getCurrencyList() + ')';
        this.http.request(this.url + '?q=' + yql + this.params)
                 .subscribe(res => this.refreshRates(res.json()));
    }

    loadHistoricalData(ccy: string, from: string, to:string) {
        let yql: string = 'select * from yahoo.finance.historicaldata where symbol in ("' + ccy + '=X") and startDate = "' + from + '" and endDate = "' + to + '" | sort(field="Date")';
        this.http.request(this.url + '?q=' + yql + this.params)
                 .subscribe(res => this.refreshHistory(res.json()));
    }

    getCurrenciesExcept(ccy: string) {
        return this.currencies.filter(c => c.code != ccy);
    }

    public lineChartData:Array<any> = [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'}
    ];
    public lineChartLabels:Array<any> = ['January'];

    private refreshHistory(rates) {
        let _lineChartData = [];
        let _lineChartLabels = [];
        let ccy: string = '';
        let values: Array<any> = [];
        let isLabelsSet: boolean = false;
        for (let quote of rates.query.results.quote) {                    
            if (ccy === '' || ccy != quote.Symbol) {
                if (ccy != '') {
                    isLabelsSet = true;
                }
                ccy = quote.Symbol;
                values = [];
                _lineChartData.push({data: values, label: "USD" + '/' + ccy.substr(0, 3)});
            }
            values.push(parseFloat(quote.Close));
            if (!isLabelsSet) {
                _lineChartLabels.push(quote.Date);
            }  
        }
        this.lineChartData = _lineChartData;
        this.lineChartLabels = _lineChartLabels;
    }

    private refreshRates(rates) {
        for (let rate of rates.query.results.rate) {
            for (let ccy of this.currencies) {
                if ("USD" + ccy.code === rate.id) {
                    ccy.usdRate = rate.Rate;
                }
            }
        }
        this.recalculateByCurrency(null);
        this.isLoading = false;       
    }

    private getCurrencyByCode(code: string): Currency {
        for (let c of this.currencies) {
            if (c.code === code) {
                return c;
            }
        }
        return null;
    }

    private getCurrencyList(): string {
        let list = '';
        for (let code of this.currencies) {
            list += list === ''?'':',';
            list += '"USD' + code.code + '"';
        }
        return list;
    }

}