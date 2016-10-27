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
    public isLoading: boolean;

    constructor(private http: Http) {
        this.currencies = [{ code: 'USD', usdRate: 1, amount: 1 }, 
                           { code: 'RUB', usdRate: 10.8174, amount: 0 }, 
                           { code: 'BGN', usdRate: 10.8174, amount: 0 }, 
                           { code: 'EUR', usdRate: 10.8174, amount: 0 }, 
                           { code: 'CAD', usdRate: 10.8174, amount: 0 }, 
                           { code: 'GBP', usdRate: 10.8174, amount: 0 }, 
                           { code: 'HKD', usdRate: 10.8174, amount: 0 }, 
                           { code: 'SGD', usdRate: 21.3899, amount: 0 }
                        ];
        this.isLoading = true;
    }

    add(ccyCode: string) {
        if (ccyCode != undefined && ccyCode != '') {
            let ccy = this.getCurrencyByCode('USD');
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
        let usdAmount: number = (ccy.amount * ccy.usdRate);
        for (let c of this.currencies) {
            if (c.code != ccy.code) {
                c.amount = Math.round((usdAmount * (c.usdRate)) * 100)/100;
            }
        }
    }

    loadRates() {
        this.isLoading = true;
        let yql: string = 'select * from yahoo.finance.xchange where pair in (' + this.getCurrencyList() + ')';
        this.http.request(this.url + '?q=' + yql + this.params)
                 .subscribe(res => this.refreshRates(res.json()));
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