import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Currency } from '../vo/currency';

@Injectable()
export class CurrenciesService {

    public currencies: Currency[];

    constructor(private http: Http) {
        this.currencies = [{ code: 'USD', usdRate: 1, amount: 0 }, 
                           { code: 'GPB', usdRate: 0.8174, amount: 0 }, 
                           { code: 'SGD', usdRate: 1.3899, amount: 0 }
                        ];
    }

    add(ccy: string) {
        this.refreshRates();
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

    refreshRates() {
        let rates = this.loadRates();
        console.log(rates);
        
    }

    loadRates() {
        return this.http.request('env \'store://datatables.org/alltableswithkeys\'; http://query.yahooapis.com/v1/public/yql?q=select * from yahoo.finance.xchange where pair in ("USDUSD", "USDGPB", "USDCGD")&env=store://datatables.org/alltableswithkeys&format=json')
                   .subscribe((res: Response) => { res.json() })
    }

}