import { Component } from '@angular/core';

import { CcyConverterComponent } from './components/ccy-converter/ccy-converter.component';

@Component({
  selector: 'my-app',
  template: '<h1>Market Data Viewer</h1><ccy-converter></ccy-converter>'
})
export class AppComponent { }
