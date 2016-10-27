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

    constructor(private http: Http) {
        this.currencies = [{ code: 'USD', usdRate: 1, amount: 0 }, 
                           { code: 'GBP', usdRate: 10.8174, amount: 0 }, 
                           { code: 'SGD', usdRate: 21.3899, amount: 0 }
                        ];
    }

    add(ccy: string) {
        this.loadRates();
        if (ccy != undefined && ccy != '') {
            //let index = this.currencies.indexOf(ccy, 0);
            //if (index === -1) {
            //    this.currencies.push(ccy);
           // }
        }
    }

    delete(ccy: string) {
        //let index = this.currencies.indexOf(ccy, 0);
        //if (index > -1) {
        //    this.currencies.splice(index, 1);
       // }
    }

    recalculateByCurrency(ccy: Currency) {
        let usdAmount: number = (ccy.amount * ccy.usdRate);
        for (let c of this.currencies) {
            if (c.code != ccy.code) {
                c.amount = Math.round((usdAmount * (c.usdRate)) * 100)/100;
            }
        }
    }

    loadRates() {
        let yql: string = 'select * from yahoo.finance.xchange where pair in (' + this.getCurrencyList() + ')';
        this.http.request(this.url + '?q=' + yql + this.params)
                 .subscribe(res => this.refreshRates(res.json()));
    }

    refreshRates(rates) {
        for (let rate of rates.query.results.rate) {
            for (let ccy of this.currencies) {
                if ("USD" + ccy.code === rate.id) {
                    console.log(ccy.code + " : " + rate.Rate);
                    ccy.usdRate = rate.Rate;
                }
            }
        }
        //recalculateByCurrency("USD");
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